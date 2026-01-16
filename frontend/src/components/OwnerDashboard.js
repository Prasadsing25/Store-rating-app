import { useEffect, useState } from "react";
import api from "../api/api";

export default function OwnerDashboard() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    api.get("/owner/dashboard").then(res => {
      setRatings(res.data.ratings || res.data || []);
    });
  }, []);

  return (
    <div className="container">
      <h2>Store Owner Dashboard</h2>

      {Array.isArray(ratings) && ratings.map((r, i) => (
        <div className="card" key={i}>
          <p><b>{r.name}</b></p>
          <p>({r.email}) </p>
          <p> {r.rating}</p>
        </div>
      ))}
    </div>
  );
}
