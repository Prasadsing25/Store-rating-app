import { useEffect, useState } from "react";
import api from "../api/api";

export default function StoreList() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    api.get("/stores").then(res => setStores(res.data));
  }, []);

  const rate = async (id, rating) => {
    await api.post("/ratings", { store_id: id, rating });
    alert("Rated!");
  };

  return (
    <div className="container">
      <h2>Stores</h2>
      {stores.map(s => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>{s.address}</p>
          <p>Rating: {s.rating}</p>
          <input type="number" min="1" max="5"
            onBlur={e => rate(s.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
