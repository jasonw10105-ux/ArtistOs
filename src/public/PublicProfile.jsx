import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PublicProfile(){
  const { username } = useParams();
  const [p,setP]=useState(null);
  const [art,setArt]=useState([]);
  const [message,setMessage]=useState(""); const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [artworkId,setArtworkId]=useState("");

  useEffect(()=>{ (async ()=>{
    const { data: prof } = await supabase.from("profiles").select("*").eq("username", username).single();
    setP(prof);
    if(prof){
      const { data: a } = await supabase.from("artworks").select("*").eq("artist_id", prof.id).eq("public", true).order("created_at",{ascending:false});
      setArt(a||[]);
    }
  })(); },[username]);

  async function inquire(){
    const { error } = await supabase.from("inquiries").insert([{
      artist_id: p.id, artwork_id: artworkId||null, name, email, message
    }]);
    if(error) return alert(error.message);
    setMessage(""); setName(""); setEmail(""); alert("Thanks — the artist will reply soon.");
  }

  if(!p) return <div className="container"><p>Artist not found.</p></div>;
  return (
    <div className="container">
      <div className="row" style={{alignItems:"center"}}>
        {p.avatar_url && <img src={p.avatar_url} style={{width:72,height:72,borderRadius:16,objectFit:"cover"}}/>}
        <div>
          <h2 style={{margin:0}}>{p.display_name||p.username}</h2>
          <p className="muted">{p.bio}</p>
        </div>
      </div>
      <div className="grid" style={{marginTop:16}}>
        {art.map(a=>(
          <div key={a.id} className="card">
            {a.images?.[0] && <img src={a.images[0]} style={{width:"100%",borderRadius:8,objectFit:"cover"}}/>}
            <div className="row" style={{justifyContent:"space-between"}}>
              <div><strong>{a.title}</strong></div>
              <div className="muted">{a.current_price?`${a.currency} ${a.current_price}`:""}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{marginTop:24}}>
        <h3>Contact the artist</h3>
        <div className="grid grid-2">
          <div className="field"><label>Your name</label><input value={name} onChange={e=>setName(e.target.value)}/></div>
          <div className="field"><label>Your email</label><input value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div className="field" style={{gridColumn:"1/-1"}}><label>Artwork (optional)</label>
            <select value={artworkId} onChange={e=>setArtworkId(e.target.value)}>
              <option value="">—</option>
              {art.map(a=><option value={a.id} key={a.id}>{a.title}</option>)}
            </select>
          </div>
          <div className="field" style={{gridColumn:"1/-1"}}><label>Message</label><textarea rows="4" value={message} onChange={e=>setMessage(e.target.value)} /></div>
          <button className="btn btn-primary" onClick={inquire}>Send inquiry</button>
        </div>
      </div>
    </div>
  );
}