import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Home from "./Home";
import Artworks from "./Artworks";
import Catalogues from "./Catalogues";
import Inquiries from "./Inquiries";
import Orders from "./Orders";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

function handleLogout() {
  supabase.auth.signOut().then(({ error }) => {
    if (error) return alert(error.message);
    navigate("/"); // sends user back to login/signup
  });
}

export default function Dashboard(){
  const navigate = useNavigate();
  return (
    <div className="container">
      <header className="dashboard-header">
        <h1>Welcome, Artist!</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Log Out
        </button>
      </header>
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
