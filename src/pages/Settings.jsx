import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    avatar_url: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [navigate]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .update({
        name: profile.name,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
      })
      .eq("user_id", user.id);

    if (error) {
      alert("Error saving profile: " + error.message);
    } else {
      alert("Profile updated!");
    }

    setSaving(false);
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setPasswordSaving(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      alert("Error updating password: " + error.message);
    } else {
      alert("Password updated successfully!");
      setNewPassword("");
    }

    setPasswordSaving(false);
  }

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="settings">
      <h1>Account Settings</h1>
      <form onSubmit={handleSave}>
        <label>Name</label>
        <input
          type="text"
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        <label>Bio</label>
        <textarea
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />

        <label>Avatar URL</label>
        <input
          type="url"
          value={profile.avatar_url || ""}
          onChange={(e) =>
            setProfile({ ...profile, avatar_url: e.target.value })
          }
        />

        {profile.avatar_url && (
          <div>
            <img
              src={profile.avatar_url}
              alt="Avatar"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </div>
        )}

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <hr />

      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          minLength={8}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={passwordSaving}>
          {passwordSaving ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
