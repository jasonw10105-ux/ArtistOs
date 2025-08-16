import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Logout function
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      navigate("/"); // back to marketing/login
    }
  }

  // Fetch or create profile
  useEffect(() => {
    async function fetchOrCreateProfile() {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setLoading(false);
        navigate("/"); // not logged in, redirect
        return;
      }

      // Check if profile exists
      const { data: existingProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Error fetching profile:", profileError.message);
        setLoading(false);
        return;
      }

      if (existingProfile) {
        setProfile(existingProfile);
        setLoading(false);
        return;
      }

      // If no profile, create one
      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert([
          {
            user_id: user.id,
            name: user.email, // default to email
            bio: "",
            avatar_url: "",
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Error creating profile:", insertError.message);
      } else {
        setProfile(newProfile);
      }

      setLoading(false);
    }

    fetchOrCreateProfile();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {profile?.name || "Artist"}!</h1>
        <button onClick={handleLogout} className="btn btn-secondary">
          Log Out
        </button>
      </header>

      <main className="dashboard-main">
        <section>
          <h2>Your Profile</h2>
          <p><strong>Email:</strong> {profile?.name}</p>
          <p><strong>Bio:</strong> {profile?.bio || "No bio yet."}</p>
        </section>

        <section>
          <h2>Your Artworks</h2>
          <p>(This is where artwork management will go)</p>
        </section>

        <section>
          <h2>Your Catalogues</h2>
          <p>(This is where catalogue management will go)</p>
        </section>

        <section>
          <h2>Sales & Inquiries</h2>
          <p>(This is where sales tracking will go)</p>
        </section>
      </main>
    </div>
  );
}
