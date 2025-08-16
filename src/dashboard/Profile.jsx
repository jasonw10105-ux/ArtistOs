import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Profile(){
  const [p,setP]=useState(null);
  const [avatar, setAvatar]=useState(null);

  useEffect(()=>{ (async ()=>{
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setP(data);
  })(); },[]);

  async function save(){
    const { error } = await supabase.from("profiles").update(p).eq("id", p.id);
    if(error) alert(error.message); else alert("Saved");
  }

  async function uploadAvatar(file){
    const name = `${p.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("avatars").upload(name, file);
    if(error) return alert(error.message);
    const { data: pub } = await supabase.storage.from("avatars").getPublicUrl(name);
    setP({...p, avatar_url: pub.publicUrl});
  }

  if(!p) return null;
  return (
    <div className="grid">
      <div className="card">
        <h3>Profile</h3>
        <div className="grid grid-2">
          <div className="field"><label>Username</label><input value={p.username||""} onChange={e=>setP({...p,username:e.target.value})}/></div>
          <div className="field"><label>Display name</label><input value={p.display_name||""} onChange={e=>setP({...p,display_name:e.target.value})}/></div>
          <div className="field"><label>Website</label><input value={p.website||""} onChange={e=>setP({...p,website:e.target.value})}/></div>
          <div className="field"><label>Accent color</label><input type="color" value={p.accent_color||"#3b82f6"} onChange={e=>setP({...p,accent_color:e.target.value})}/></div>
          <div className="field" style={{gridColumn:"1/-1"}}><label>Bio</label><textarea rows="4" value={p.bio||""} onChange={e=>setP({...p,bio:e.target.value})}/></div>
          <div className="field"><label>Avatar</label><input type="file" onChange={e=>uploadAvatar(e.target.files?.[0])}/></div>
          {p.avatar_url && <img src={p.avatar_url} style={{width:96,height:96,borderRadius:12,objectFit:"cover"}}/>}
          <div className="row"><label><input type="checkbox" checked={!!p.is_public} onChange={e=>setP({...p,is_public:e.target.checked})}/> Public profile</label></div>
        </div>
        <button className="btn btn-primary" onClick={save}>Save</button>
      </div>
    </div>
  );
}