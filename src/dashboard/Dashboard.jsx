import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      navigate("/auth");
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🎨 Artist Dashboard</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <main>
        <p>Welcome to your dashboard! You can now upload artworks, create catalogues, and manage sales.</p>
      </main>
    </div>
  );
}
