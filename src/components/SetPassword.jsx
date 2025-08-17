// src/components/SetPassword.jsx
import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSetPassword = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    setMessage(error.message);
  } else {
    // mark password as set
    await supabase.auth.updateUser({ data: { password_set: true } });

    setMessage("Password updated! Redirecting to dashboard...");
    setTimeout(() => navigate("/dashboard"), 2000);
  }

  setLoading(false);
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Set Your Password
        </h2>
        <form onSubmit={handleSetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Password"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
}
