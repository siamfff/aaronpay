export interface PaymentSession {
  id: string;
  merchantId: string;
  merchantName: string;
  merchantLogo?: string;
  orderId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED";
  createdAt: string;
  expiresAt: string;
  paymentMethods: {
    bkash?: { enabled: boolean; number: string };
    nagad?: { enabled: boolean; number: string };
    rocket?: { enabled: boolean; number: string };
  };
}