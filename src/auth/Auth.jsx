import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/set-password`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your inbox for the login link. After verifying, you can set your password.");
    }

    setLoading(false);
  }

  return (
    <div className="auth-page">
      <h1>Log In / Sign Up</h1>
      <form onSubmit={handleLogin}>
        <label>Email address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Sending..." : "Send Login Link"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
