import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/hooks/useAuth";
import { Spinner } from "@/components/ui/Spinner";

interface Props {
  role?: "merchant" | "admin";
  children: React.ReactNode;
}

export default function ProtectedRoute({ role, children }: Props) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={28} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role === "admin" && profile?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (role === "merchant" && profile?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}