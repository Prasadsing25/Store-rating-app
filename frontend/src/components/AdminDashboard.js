import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminDashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get("/admin/dashboard").then(res => setData(res.data));
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div className="card">Users: {data.users}</div>
      <div className="card">Stores: {data.stores}</div>
      <div className="card">Ratings: {data.ratings}</div>
    </div>
  );
}
