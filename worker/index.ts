import type { Env } from "./types/env";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS হেডার
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, Bypass-Tunnel-Reminder",
      "Access-Control-Max-Age": "86400",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // ─── ১. পেমেন্ট ভেরিফিকেশন (XNXANIKPAY Path) ───
    if (url.pathname === "/api/verify-payment" && request.method === "POST") {
      try {
        const body: any = await request.json();
        const { merchantId, txnId, method, amount } = body;

        if (!merchantId || !txnId || !method || !amount) {
          return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: corsHeaders });
        }

        const dbUrl = `${env.FIREBASE_DATABASE_URL}/XNXANIKPAY/${merchantId}/${txnId}.json`;
        const response = await fetch(dbUrl);
        const data: any = await response.json();

        if (!data) {
          return new Response(JSON.stringify({ error: "Transaction ID not found in App." }), { status: 404, headers: corsHeaders });
        }

        // টাকার পরিমাণ চেক (Number কনভার্সন নিশ্চিত করা হলো)
        if (Number(data.amount) !== Number(amount)) {
          return new Response(JSON.stringify({ error: `Amount mismatch. Expected: ৳${amount}, Found: ৳${data.amount}` }), { status: 400, headers: corsHeaders });
        }
        
        // মেথড চেক
        if (data.paymentMethod?.toLowerCase() !== method?.toLowerCase()) {
          return new Response(JSON.stringify({ error: "Payment method mismatch." }), { status: 400, headers: corsHeaders });
        }

        // Auto Pay চেক (TrxID আগে ব্যবহার হয়েছে কিনা)
        const autoPayUrl = `${env.FIREBASE_DATABASE_URL}/Auto Pay/${txnId}.json`;
        const autoPayRes = await fetch(autoPayUrl);
        const autoPayData: any = await autoPayRes.json();

        if (autoPayData) {
          return new Response(JSON.stringify({ error: "Transaction ID already used." }), { status: 400, headers: corsHeaders });
        }

        // ব্যবহার হয়ে গেলে Auto Pay-তে সেভ করা
        await fetch(autoPayUrl, {
          method: "PUT",
          body: JSON.stringify({ usedAt: new Date().toISOString(), merchantId })
        });

        // ─── ওয়েবহুক (Webhook) সিস্টেম ───
        try {
          const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/merchants/${merchantId}`;
          const merchantRes = await fetch(firestoreUrl);
          if (merchantRes.ok) {
            const merchantDoc: any = await merchantRes.json();
            const webhookUrl = merchantDoc.fields?.webhookUrl?.stringValue;

            if (webhookUrl) {
              await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  event: "payment.success",
                  txnId: txnId,
                  amount: amount,
                  method: method,
                  merchantId: merchantId,
                  timestamp: new Date().toISOString()
                })
              }).catch(err => console.error("Webhook failed:", err));
            }
          }
        } catch (webhookErr) {
          console.error("Webhook error:", webhookErr);
        }

        return new Response(JSON.stringify({ success: true, message: "Payment verified" }), { status: 200, headers: corsHeaders });

      } catch (err) {
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: corsHeaders });
      }
    }

    // ─── ২. নতুন পেমেন্ট সেশন তৈরি (API Key ভেরিফিকেশন সহ) ───
    if (url.pathname === "/api/create-session" && request.method === "POST") {
      try {
        const body: any = await request.json();
        const { orderId, amount, apiKey } = body;

        // API Key চেক
        if (!apiKey || !apiKey.startsWith("ap_live_")) {
          return new Response(JSON.stringify({ error: "Invalid API Key" }), { status: 401, headers: corsHeaders });
        }

        if (!orderId || !amount) {
          return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400, headers: corsHeaders });
        }

        // Firestore থেকে API Key দিয়ে মার্চেন্ট খোঁজা
        const queryUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`;
        
        const queryPayload = {
          structuredQuery: {
            from: [{ collectionId: "merchants" }],
            where: {
              fieldFilter: {
                field: { fieldPath: "apiKey" },
                op: "EQUAL",
                value: { stringValue: apiKey }
              }
            },
            limit: 1
          }
        };

        const queryRes = await fetch(queryUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(queryPayload)
        });

        const queryData: any = await queryRes.json();

        if (!queryData || !queryData[0] || !queryData[0].document) {
          return new Response(JSON.stringify({ error: "Merchant not found for this API Key." }), { status: 404, headers: corsHeaders });
        }

        const merchantDoc = queryData[0].document;
        const docPath = merchantDoc.name; 
        const merchantId = docPath.split('/').pop();

        // মার্চেন্টের ডেটা (নাম, লোগো, নাম্বার) বের করা
        const fields = merchantDoc.fields || {};
        const businessName = fields.businessName?.stringValue || "Merchant";
        const logoUrl = fields.logoUrl?.stringValue || "";
        
        const bkashEnabled = fields.paymentMethods?.mapValue?.fields?.bkash?.mapValue?.fields?.enabled?.booleanValue || false;
        const bkashNum = fields.paymentMethods?.mapValue?.fields?.bkash?.mapValue?.fields?.number?.stringValue || "";

        const nagadEnabled = fields.paymentMethods?.mapValue?.fields?.nagad?.mapValue?.fields?.enabled?.booleanValue || false;
        const nagadNum = fields.paymentMethods?.mapValue?.fields?.nagad?.mapValue?.fields?.number?.stringValue || "";

        const rocketEnabled = fields.paymentMethods?.mapValue?.fields?.rocket?.mapValue?.fields?.enabled?.booleanValue || false;
        const rocketNum = fields.paymentMethods?.mapValue?.fields?.rocket?.mapValue?.fields?.number?.stringValue || "";

        // নতুন সেশন তৈরি করে ফায়ারবেসে সেভ করা
        const sessionId = `sess_${Math.random().toString(36).substring(2, 10)}`;
        const checkoutUrl = `https://aaronpay.cyou/checkout/${sessionId}`; 

        const createSessionUrl = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/paymentSessions?documentId=${sessionId}`;
        
        const sessionPayload = {
          fields: {
            merchantId: { stringValue: merchantId },
            merchantName: { stringValue: businessName },
            merchantLogo: { stringValue: logoUrl },
            orderId: { stringValue: orderId },
            amount: { integerValue: amount.toString() },
            currency: { stringValue: "BDT" },
            status: { stringValue: "PENDING" },
            createdAt: { timestampValue: new Date().toISOString() },
            paymentMethods: {
              mapValue: {
                fields: {
                  bkash: { mapValue: { fields: { enabled: { booleanValue: bkashEnabled }, number: { stringValue: bkashNum } } } },
                  nagad: { mapValue: { fields: { enabled: { booleanValue: nagadEnabled }, number: { stringValue: nagadNum } } } },
                  rocket: { mapValue: { fields: { enabled: { booleanValue: rocketEnabled }, number: { stringValue: rocketNum } } } },
                }
              }
            }
          }
        };

        await fetch(createSessionUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sessionPayload)
        });

        return new Response(JSON.stringify({ 
          success: true, 
          sessionId, 
          checkoutUrl 
        }), { status: 200, headers: corsHeaders });

      } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: corsHeaders });
      }
    }

    // Health Check
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok" }), { headers: corsHeaders });
    }

    // SPA Fallback (রিঅ্যাক্ট অ্যাপের জন্য)
    return env.ASSETS.fetch(request);
  },
};