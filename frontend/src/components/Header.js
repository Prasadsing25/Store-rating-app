import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: 10, background: "#ddd" }}>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
