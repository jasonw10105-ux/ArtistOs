import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ProfileSetup from "./ProfileSetup";

export default function Auth(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stage, setStage] = useState("auth"); // auth | profile
  const [user, setUser] = useState(null);

  useEffect(()=>{
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  },[]);

  async function signUp(){
    const { data, error } = await supabase.auth.signUp({ email, password });
    if(error) return alert(error.message);
    alert("Check your email for confirmation, then sign in.");
  }
  async function signIn(){
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if(error) return alert(error.message);
    setUser(data.user);
    setStage("profile");
  }

  if(stage==="profile" && user){
    return <ProfileSetup onDone={()=>window.location.reload()} user={user} />;
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:480, margin:"40px auto"}}>
        <h2>ArtistOS</h2>
        <p className="muted">Log in or create your account</p>
        <div className="grid">
          <div className="field">
            <label>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/>
          </div>
          <div className="row">
            <button className="btn btn-primary" onClick={signIn}>Sign in</button>
            <button className="btn" onClick={signUp}>Create account</button>
          </div>
        </div>
      </div>
    </div>
  );
}