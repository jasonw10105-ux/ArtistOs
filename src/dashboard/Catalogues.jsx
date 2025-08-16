import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Catalogues(){
  const [cats,setCats]=useState([]);
  const [title,setTitle]=useState("");
  const [myArt,setMyArt]=useState([]);
  const [sel,setSel]=useState({});

  async function load(){
    const { data: { user } } = await supabase.auth.getUser();
    const { data: c } = await supabase.from("catalogues").select("*").eq("artist_id", user.id).order("created_at", {ascending:false});
    setCats(c||[]);
    const { data: a } = await supabase.from("artworks").select("id,title,images").eq("artist_id", user.id).order("created_at", {ascending:false});
    setMyArt(a||[]);
  }
  useEffect(()=>{ load(); },[]);

  function toggle(id){ setSel(s=>({...s,[id]:!s[id]})); }

  async function create(){
    const { data: { user } } = await supabase.auth.getUser();
    const artworks = Object.entries(sel).filter(([,v])=>v).map(([k])=>k);
    const { error } = await supabase.from("catalogues").insert([{ artist_id:user.id, title, artworks, access:'public' }]);
    if(error) return alert(error.message);
    setTitle(""); setSel({}); load();
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>Create catalogue</h3>
        <div className="field"><label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div className="grid">
          {myArt.map(a=> (
            <label key={a.id} className="row">
              <input type="checkbox" checked={!!sel[a.id]} onChange={()=>toggle(a.id)}/>
              {a.images?.[0] && <img src={a.images[0]} style={{width:48,height:48,objectFit:"cover",borderRadius:8}}/>}
              <span>{a.title}</span>
            </label>
          ))}
        </div>
        <button className="btn btn-primary" onClick={create}>Create</button>
      </div>

      <div className="card">
        <h3>Your catalogues</h3>
        <div className="grid">
          {cats.map(c=>(
            <div key={c.id} className="row" style={{justifyContent:"space-between"}}>
              <div><strong>{c.title}</strong></div>
              <a className="btn" href={`/c/placeholder/${c.id}`} target="_blank" rel="noreferrer">Open public link</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}