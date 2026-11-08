import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Users, CreditCard, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [merchants, setMerchants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMerchants() {
      try {
        const querySnapshot = await getDocs(collection(db, "merchants"));
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setMerchants(data);
      } catch (err) {
        console.error("Error fetching merchants:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMerchants();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all merchants and subscriptions.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Users size={24} /></div>
            <div><p className="text-sm text-gray-500">Total Merchants</p><p className="text-2xl font-bold">{merchants.length}</p></div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><ShieldCheck size={24} /></div>
            <div><p className="text-sm text-gray-500">Active Subscriptions</p><p className="text-2xl font-bold">{merchants.filter(m => m.subscriptionStatus === "active").length}</p></div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><CreditCard size={24} /></div>
            <div><p className="text-sm text-gray-500">Total Merchants (Demo)</p><p className="text-2xl font-bold">৳ 5,450</p></div>
          </Card>
        </div>

        {/* Merchant Table */}
        <Card padded={false}>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">Merchant List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Business Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {merchants.map((m) => (
                  <tr key={m.id}>
                    <td className="px-6 py-4 font-medium text-gray-800">{m.businessName || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-500">{m.email || "N/A"}</td>
                    <td className="px-6 py-4">
                      <Badge tone={m.subscriptionStatus === "active" ? "success" : "warning"}>
                        {m.subscriptionStatus || "Trial"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="secondary">Approve</Button>
                    </td>
                  </tr>
                ))}
                {merchants.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No merchants found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}