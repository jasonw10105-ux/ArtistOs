import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [profile, setProfile] = useState({ name: "", bio: "", avatar_url: "" });
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

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error loading profile:", error.message);
      } else if (data) {
        setProfile(data);
      }
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
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    setPasswordUpdating(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      alert("Error updating password: " + error.message);
    } else {
      alert("Password updated successfully!");
      setNewPassword("");
    }
    setPasswordUpdating(false);
  }

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="settings-page">
      <h1>Account Settings</h1>

      <form onSubmit={handleSave} className="settings-form">
        <div className="form-group">
          <label>Display Name</label>
          <input
            type="text"
            value={profile.name || ""}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Avatar URL</label>
          <input
            type="url"
            value={profile.avatar_url || ""}
            onChange={(e) =>
              setProfile({ ...profile, avatar_url: e.target.value })
            }
          />
          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              alt="Avatar preview"
              width={100}
              height={100}
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>

      <hr />

      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange} className="password-form">
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-warning"
          disabled={passwordUpdating}
        >
          {passwordUpdating ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
