import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import OverviewPage from "@/pages/merchant/OverviewPage";

export const merchantRoutes = (
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute role="merchant">
        <OverviewPage />
      </ProtectedRoute>
    }
  />
);