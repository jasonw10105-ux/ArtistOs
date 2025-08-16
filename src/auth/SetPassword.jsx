import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSetPassword(e) {
    e.preventDefault();

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) setMessage(error.message);
    else {
      setMessage("Password set successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    }
  }

  return (
    <div className="set-password">
      <h2>Create Your Password</h2>
      {message && <p className="info">{message}</p>}
      <form onSubmit={handleSetPassword}>
        <input
          type="password"
          placeholder="Choose a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Save Password
        </button>
      </form>
    </div>
  );
}
