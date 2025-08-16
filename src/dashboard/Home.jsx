import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
export default function Home(){
  const [me,setMe]=useState(null);
  useEffect(()=>{ supabase.auth.getUser().then(async ({data})=>{
    if(!data.user) return;
    const { data: p } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
    setMe(p);
  });},[]);
  return (<div className="grid">
    <div className="card">
      <h3>Welcome back{me?.display_name?`, ${me.display_name}`:""}!</h3>
      <p className="muted">Your public page: <a href={`/${me?.username}`} target="_blank" rel="noreferrer">/{me?.username}</a></p>
    </div>
  </div>);
}