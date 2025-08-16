import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProfileSetup({ onDone, user }){
  const [username,setUsername]=useState("");
  const [display_name,setDisplayName]=useState("");
  const [bio,setBio]=useState("");
  const [accent_color,setAccent]=useState("#3b82f6");

  async function save(){
    if(!username) return alert("Choose a username");
    const { error } = await supabase.from("profiles").upsert({
      id: user.id, username, display_name, bio, accent_color, is_public: true
    });
    if(error) return alert(error.message);
    onDone && onDone();
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:640, margin:"40px auto"}}>
        <h3>Set up your profile</h3>
        <div className="grid">
          <div className="field"><label>Username (public URL)</label><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="yourname"/></div>
          <div className="field"><label>Display name</label><input value={display_name} onChange={e=>setDisplayName(e.target.value)} /></div>
          <div className="field"><label>Bio</label><textarea rows="4" value={bio} onChange={e=>setBio(e.target.value)} /></div>
          <div className="field"><label>Accent color</label><input type="color" value={accent_color} onChange={e=>setAccent(e.target.value)} /></div>
          <button className="btn btn-primary" onClick={save}>Save profile</button>
        </div>
      </div>
    </div>
  );
}