import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      } else {
        setUser(user);
      }
    }
    loadUser();
  }, [navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.email}</h1>
        <div>
          <button onClick={() => navigate("/settings")} className="btn btn-secondary">
            Account Settings
          </button>
          <button onClick={handleLogout} className="btn btn-danger">
            Log Out
          </button>
        </div>
      </header>

      <main>
        <p>This is your dashboard. From here you’ll manage artworks, sales, and catalogues.</p>
      </main>
    </div>
  );
}
