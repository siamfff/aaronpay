import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/hooks/useAuth";
import MerchantSidebar from "./MerchantSidebar";
import { Spinner } from "@/components/ui/Spinner";

export default function MerchantLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size={30} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MerchantSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}