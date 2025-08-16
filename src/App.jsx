import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Auth from "./auth/Auth";
import Dashboard from "./dashboard/Dashboard";
import PublicProfile from "./public/PublicProfile";
import PublicCatalogue from "./public/PublicCatalogue";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s)
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={session ? <Dashboard /> : <Auth />} />
      <Route path="/:username" element={<PublicProfile />} />
      <Route path="/c/:username/:catalogueId" element={<PublicCatalogue />} />
    </Routes>
  );
}
