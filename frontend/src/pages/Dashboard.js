import AdminDashboard from "../components/AdminDashboard";
import OwnerDashboard from "../components/OwnerDashboard";

export default function Dashboard() {
  const role = localStorage.getItem("role");

  if (role === "ADMIN") return <AdminDashboard />;
  if (role === "STORE_OWNER") return <OwnerDashboard />;

  return <h2>Unauthorized</h2>;
}