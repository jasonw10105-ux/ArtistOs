import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/set-password`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Check your inbox for a verification link. Once verified, you’ll be asked to create a password."
      );
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="auth-page">
      <h1>Welcome to ArtistOS</h1>
      <p>Sign up or log in to continue</p>

      {message && <div className="auth-message">{message}</div>}

      <form onSubmit={handleSignIn} className="auth-form">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Send Sign-In Link"}
        </button>
      </form>

      <div className="divider">OR</div>

      <button className="btn btn-secondary" onClick={handleGoogleLogin}>
        Continue with Google
      </button>
    </div>
  );
}
