import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";

export default function AppRoutes() {
  // আপাতত শুধু publicRoutes রাখুন, 
  // authRoutes বা merchantRoutes ফাইলে কোনো ভুল থাকলে যেন পুরো রাউটার ক্র্যাশ না করে।
  const routes = useRoutes([publicRoutes]);

  return routes;
}