import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProfileSetup({ user, onDone }) {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  async function handleSave() {
    if (!username || !displayName) return alert("All fields required");

    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,       // must match auth user ID
          username,
          display_name: displayName,
        },
      ])
      .select();

    if (error) return alert(error.message);

    onDone();
  }

  return (
    <div>
      <h2>Set up your profile</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}
