// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentSession = data?.session;

      if (!currentSession) {
        // not logged in → send to login
        navigate("/login");
        return;
      }

      const user = currentSession.user;

      // ⚡️ if user signed up by magic link only, check if they need to set password
      const hasPassword = user.app_metadata?.provider === "email" && user.user_metadata?.password_set;

      if (!hasPassword) {
        navigate("/set-password");
        return;
      }

      setSession(currentSession);
      setLoading(false);
    };

    getSession();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      <p className="mt-2 text-gray-600">You are signed in as {session?.user?.email}</p>
    </div>
  );
}
