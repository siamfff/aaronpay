import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  Copy,
  Key,
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  TriangleAlert,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/Input";

export default function ApiKeysPage() {
  const { profile, user } = useAuth(); 
  
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // পিন সেটিংস
  const [pin, setPin] = useState("");
  const [isPinSet, setIsPinSet] = useState(false);
  const [actionType, setActionType] = useState<"create" | "view" | "rotate">("create");
  const [tempKey, setTempKey] = useState(""); // পিন দেওয়ার পর temporary key দেখানোর জন্য

  const docId = profile?.merchantId || user?.uid;

  useEffect(() => {
    async function loadData() {
      if (!docId) return;
      try {
        const snap = await getDoc(doc(db, "merchants", docId));
        if (snap.exists()) {
          const data = snap.data();
          if (data.apiKey && data.apiKeyPin) {
            setIsPinSet(true);
            setApiKey("••••••••••••••••••••••••••••");
            setActionType("view");
          } else {
            setActionType("create");
          }
        }
      } catch (err) {
        console.error("Error loading API Key:", err);
      }
    }
    loadData();
  }, [docId]);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (pin.length !== 4) {
      setError("PIN must be exactly 4 digits.");
      return;
    }

    setLoading(true);

    try {
      const docRef = doc(db, "merchants", docId!);
      const snap = await getDoc(docRef);
      const data = snap.data();

      // ১. নতুন কী তৈরি করা (প্রথমবার)
      if (actionType === "create") {
        const newKey = "ap_live_" + Array.from(crypto.getRandomValues(new Uint8Array(16)))
          .map(b => b.toString(16).padStart(2, '0')).join('');
        
        await setDoc(docRef, { apiKey: newKey, apiKeyPin: pin }, { merge: true });
        
        setApiKey(newKey);
        setShowKey(true);
        setIsPinSet(true);
        setActionType("view");
        setSuccess("API Key created successfully! Please copy it now.");
        setPin("");
      
      // ২. পুরনো কী দেখা বা রোটেট করা
      } else {
        if (data?.apiKeyPin !== pin) {
          throw new Error("Incorrect PIN. Please try again.");
        }

        if (actionType === "view") {
          setApiKey(data.apiKey);
          setShowKey(true);
          setTempKey(data.apiKey);
        } else if (actionType === "rotate") {
          const newKey = "ap_live_" + Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0')).join('');
          
          await setDoc(docRef, { apiKey: newKey }, { merge: true });
          
          setApiKey(newKey);
          setShowKey(true);
          setSuccess("API Key rotated successfully! Old key is now invalid.");
        }
        setPin("");
        setActionType("view");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (apiKey && apiKey !== "••••••••••••••••••••••••••••") {
      navigator.clipboard.writeText(apiKey);
      alert("API Key copied!");
    }
  };

  // UI-only helpers (no logic impact)
  const status = !isPinSet
    ? { label: "Not created", dot: "bg-gray-400", pill: "bg-gray-100 text-gray-600" }
    : showKey
    ? { label: "Visible", dot: "bg-amber-500", pill: "bg-amber-50 text-amber-700" }
    : { label: "Active · Hidden", dot: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-700" };

  const pinTitle =
    actionType === "create"
      ? "Set a 4-digit PIN"
      : actionType === "view"
      ? "Unlock your API key"
      : "Rotate your API key";

  const pinHint =
    actionType === "create"
      ? "You'll need this PIN every time you view or rotate the key."
      : actionType === "view"
      ? "Enter your PIN to reveal the key."
      : "Enter your PIN to generate a new key. The current key stops working immediately.";

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 sm:px-0 pb-10">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">API Keys</h1>
        <p className="text-sm text-gray-500 mt-1.5 max-w-xl leading-relaxed">
          Use this key to authenticate requests from your server to AaronPay. Keep it private and never expose it in client-side code.
        </p>
      </div>

      {error && <Alert tone="error">{error}</Alert>}
      {success && <Alert tone="success">{success}</Alert>}

      <Card>
        {/* Card header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-gray-900 flex items-center justify-center text-white">
              <Key size={20} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-gray-900">Live API key</h3>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.pill}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">Used to create payment sessions.</p>
            </div>
          </div>

          {isPinSet && actionType === "view" && (
            <Button onClick={() => setActionType("rotate")} variant="secondary" size="sm">
              <RefreshCw size={14} className="mr-2"/> Rotate key
            </Button>
          )}
        </div>

        {/* Key Display */}
        <div className="mt-6">
          <div
            className={`flex items-center gap-2 rounded-xl border px-4 py-3 transition-colors ${
              showKey ? "bg-white border-gray-300 ring-4 ring-gray-100" : "bg-gray-50 border-gray-200"
            }`}
          >
            <code className="flex-1 min-w-0 text-sm font-mono text-gray-900 break-all select-all">
              {showKey ? apiKey : (isPinSet ? "••••••••••••••••••••••••••••" : "No key generated yet")}
            </code>
            
            {showKey ? (
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => setShowKey(false)}
                  aria-label="Hide key"
                  title="Hide key"
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                >
                  <EyeOff size={16} />
                </button>
                <button
                  onClick={copyToClipboard}
                  aria-label="Copy key"
                  title="Copy key"
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                >
                  <Copy size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowKey(true)}
                disabled={!isPinSet}
                aria-label="Show key"
                title={isPinSet ? "Show key" : "Create a key first"}
                className="shrink-0 p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                <Eye size={16} />
              </button>
            )}
          </div>

          {showKey && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-700">
              <TriangleAlert size={13} />
              Anyone with this key can create payments on your account. Hide it when you're done.
            </p>
          )}
        </div>

        {/* PIN Form */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <form onSubmit={handleAction} className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Lock size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{pinTitle}</p>
                <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{pinHint}</p>
              </div>
            </div>

            {actionType === "rotate" && (
              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-800 leading-relaxed">
                <TriangleAlert size={14} className="mt-0.5 shrink-0" />
                Any server still using the current key will fail to authenticate until you update it.
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Input 
                type="password"
                inputMode="numeric"
                autoComplete="off"
                placeholder="••••"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                className="w-full sm:max-w-[180px] text-center tracking-[0.6em] font-bold text-lg"
              />
              <div className="flex items-center gap-2">
                <Button type="submit" loading={loading} disabled={pin.length !== 4}>
                  {actionType === "create" ? "Create key" : actionType === "view" ? "Unlock key" : "Rotate key"}
                </Button>
                {actionType !== "create" && (
                  <button 
                    type="button" 
                    onClick={() => setActionType("view")}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                  >
                    <X size={14} />
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-400">
              PIN must be exactly 4 digits. {pin.length}/4
            </p>
          </form>
        </div>
      </Card>

      {/* Usage hint */}
      <Card>
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <ShieldCheck size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900">How to use your key</p>
            <p className="text-sm text-gray-500 mt-0.5">
              Send it in the Authorization header of every server-to-server request.
            </p>
            <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <code className="whitespace-nowrap text-xs font-mono text-gray-700">
                Authorization: Bearer ap_live_••••••••••••••••
              </code>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}