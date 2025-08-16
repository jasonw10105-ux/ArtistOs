import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

export default function Artworks(){
  const [items,setItems]=useState([]);
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [currency,setCurrency]=useState("USD");
  const [imageFile,setImageFile]=useState(null);

  async function load(){
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("artworks").select("*").eq("artist_id", user.id).order("created_at", {ascending:false});
    if(error) return alert(error.message);
    setItems(data||[]);
  }
  useEffect(()=>{ load(); },[]);

  async function add(){
    const { data: { user } } = await supabase.auth.getUser();
    let images = [];
    if(imageFile){
      const name = `${user.id}/${Date.now()}-${imageFile.name}`;
      const { error: upErr } = await supabase.storage.from("artworks").upload(name, imageFile);
      if(upErr) return alert(upErr.message);
      const { data: pub } = await supabase.storage.from("artworks").getPublicUrl(name);
      images = [pub.publicUrl];
    }
    const { error } = await supabase.from("artworks").insert([{
      artist_id: user.id, title, current_price: price? Number(price): null, currency, images
    }]);
    if(error) return alert(error.message);
    setTitle(""); setPrice(""); setImageFile(null); load();
  }

  async function setPublic(id, value){
    await supabase.from("artworks").update({ public: value }).eq("id", id);
    load();
  }

  return (
    <div className="grid">
      <div className="card">
        <h3>Add artwork</h3>
        <div className="grid grid-2">
          <div className="field"><label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} /></div>
          <div className="field"><label>Price</label><input value={price} onChange={e=>setPrice(e.target.value)} placeholder="e.g. 1500" /></div>
          <div className="field"><label>Currency</label>
            <select value={currency} onChange={e=>setCurrency(e.target.value)}>
              {["USD","EUR","GBP","ZAR","JPY"].map(c=> <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field"><label>Image</label><input type="file" onChange={e=>setImageFile(e.target.files?.[0]||null)} /></div>
        </div>
        <button className="btn btn-primary" onClick={add}>Save</button>
      </div>

      <div className="card">
        <h3>Your artworks</h3>
        <div className="grid">
          {items.map(a=> (
            <div key={a.id} className="row" style={{justifyContent:"space-between"}}>
              <div className="row">
                {a.images?.[0] && <img src={a.images[0]} alt="" style={{width:64,height:64,objectFit:"cover",borderRadius:8}}/>}
                <div>
                  <div><strong>{a.title}</strong></div>
                  <div className="muted">{a.current_price?`${a.currency} ${a.current_price}`:"No price"}</div>
                </div>
              </div>
              <div className="row">
                <span className="pill">{a.public? "Public":"Private"}</span>
                <button className="btn" onClick={()=>setPublic(a.id, !a.public)}>Toggle visibility</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}