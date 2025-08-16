import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Home from "./Home";
import Artworks from "./Artworks";
import Catalogues from "./Catalogues";
import Inquiries from "./Inquiries";
import Orders from "./Orders";
import Profile from "./Profile";

export default function Dashboard(){
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="nav">
        <Link to="">Overview</Link>
        <Link to="artworks">Artworks</Link>
        <Link to="catalogues">Catalogues</Link>
        <Link to="inquiries">Inquiries</Link>
        <Link to="orders">Orders</Link>
        <Link to="profile">Profile</Link>
        <span style={{flex:1}}/>
        <button className="btn" onClick={()=>supabase.auth.signOut().then(()=>navigate("/"))}>Sign out</button>
      </div>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="artworks" element={<Artworks/>} />
        <Route path="catalogues" element={<Catalogues/>} />
        <Route path="inquiries" element={<Inquiries/>} />
        <Route path="orders" element={<Orders/>} />
        <Route path="profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}