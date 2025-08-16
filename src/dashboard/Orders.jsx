import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Orders(){
  const [items,setItems]=useState([]);
  useEffect(()=>{ (async ()=>{
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from("orders").select("*").eq("artist_id", user.id).order("created_at",{ascending:false});
    setItems(data||[]);
  })(); },[]);
  return (
    <div className="card">
      <h3>Orders</h3>
      <div className="grid">
        {items.map(o=>(
          <div key={o.id} className="row" style={{justifyContent:"space-between"}}>
            <div>
              <div><strong>{o.buyer_name}</strong> — {o.currency} {o.total_amount}</div>
              <div className="muted">{o.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}