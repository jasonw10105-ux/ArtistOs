import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PublicCatalogue(){
  const { username, catalogueId } = useParams();
  const [p,setP]=useState(null);
  const [cat,setCat]=useState(null);
  const [art,setArt]=useState([]);

  useEffect(()=>{ (async ()=>{
    const { data: prof } = await supabase.from("profiles").select("*").eq("username", username).single();
    setP(prof);
    if(!prof) return;
    const { data: c } = await supabase.from("catalogues").select("*").eq("id", catalogueId).eq("artist_id", prof.id).single();
    setCat(c);
    if(c?.artworks?.length){
      const { data: a } = await supabase.from("artworks").select("*").in("id", c.artworks);
      setArt(a||[]);
    }
  })(); },[username, catalogueId]);

  if(!p || !cat) return <div className="container"><p>Catalogue not found.</p></div>;

  return (
    <div className="container">
      <h2 style={{marginBottom:8}}>{cat.title}</h2>
      <p className="muted">By {p.display_name||p.username}</p>
      <div className="grid">
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
    </div>
  );
}