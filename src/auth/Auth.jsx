import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/set-password` },
    });

    if (error) setMessage(error.message);
    else {
      setMessage(
        "Check your inbox to verify your email. You’ll be able to set your password after verifying."
      );
      setEmail("");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) setMessage(error.message);
    else {
      setMessage("Check your email for a login link.");
      setEmail("");
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });

    if (error) setMessage(error.message);
  }

  return (
    <div className="auth-container">
      <h2>Log In / Sign Up</h2>
      {message && <p className="info">{message}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>

      <p>or</p>

      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Sign up with your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-secondary">
          Sign Up
        </button>
      </form>

      <p>or continue with</p>
      <button onClick={handleGoogle} className="btn btn-google">
        Google
      </button>
    </div>
  );
}
