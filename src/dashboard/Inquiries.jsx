import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Inquiries(){
  const [items,setItems]=useState([]);
  useEffect(()=>{ (async ()=>{
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from("inquiries").select("*").eq("artist_id", user.id).order("created_at",{ascending:false});
    setItems(data||[]);
  })(); },[]);
  return (
    <div className="card">
      <h3>Inquiries</h3>
      <div className="grid">
        {items.map(i=>(
          <div key={i.id} className="row" style={{justifyContent:"space-between"}}>
            <div>
              <div><strong>{i.name}</strong> — {i.email}</div>
              <div className="muted">{i.message}</div>
            </div>
            <span className="pill">{i.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}