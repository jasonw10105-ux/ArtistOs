import { useState } from "react";
import { supabase } from "../supabaseClient";
import ProfileSetup from "./ProfileSetup";

export default function Auth() {
  const [stage, setStage] = useState("login"); // login | signup | profile
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // Sign up
  async function signUp() {
  if (!email || !password) return alert("Email & password required");

  const { data, error } = await supabase.auth.signUp(
    { email, password },
    {
      redirectTo: import.meta.env.VITE_SITE_URL + "/"
    }
  );

  if (error) return alert(error.message);
  alert(
    "Signup successful! Check your email. After confirming, you'll be redirected to the app."
  );
  setStage("login");
}

  // Sign in
  async function signIn() {
    if (!email || !password) return alert("Email & password required");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return alert(error.message);
    setUser(data.user);
    setStage("profile");
  }

  if (stage === "profile" && user) {
    return <ProfileSetup onDone={() => window.location.reload()} user={user} />;
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, margin: "40px auto" }}>
        <h2>ArtistOS</h2>
        <p className="muted">Log in or create your account</p>
        <div className="grid">
          <div className="field">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="row" style={{ gap: 8 }}>
            {stage === "login" ? (
              <>
                <button className="btn btn-primary" onClick={signIn}>
                  Log in
                </button>
                <button className="btn" onClick={() => setStage("signup")}>
                  Sign up
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-primary" onClick={signUp}>
                  Create account
                </button>
                <button className="btn" onClick={() => setStage("login")}>
                  Back to login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
