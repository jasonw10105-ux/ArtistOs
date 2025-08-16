import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Artworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArt, setNewArt] = useState({ title: "", price: "", currency: "USD", editions: 1, for_sale: false });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtworks() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("user_id", user.id);
      if (error) console.error(error);
      else setArtworks(data || []);
      setLoading(false);
    }

    fetchArtworks();
  }, [navigate]);

  async function handleAddArtwork(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("artworks")
      .insert([{ ...newArt, user_id: user.id }])
      .select();
    if (error) alert("Error: " + error.message);
    else setArtworks([...artworks, data[0]]);
    setNewArt({ title: "", price: "", currency: "USD", editions: 1, for_sale: false });
  }

  async function toggleForSale(id, current) {
    const { error } = await supabase
      .from("artworks")
      .update({ for_sale: !current })
      .eq("id", id);
    if (error) alert(error.message);
    else setArtworks(artworks.map(a => a.id === id ? {...a, for_sale: !current} : a));
  }

  if (loading) return <div>Loading artworks...</div>;

  return (
    <div className="artworks-page">
      <h1>Your Artworks</h1>

      <form onSubmit={handleAddArtwork}>
        <input placeholder="Title" value={newArt.title} onChange={e => setNewArt({...newArt, title: e.target.value})} required />
        <input type="number" placeholder="Price" value={newArt.price} onChange={e => setNewArt({...newArt, price: e.target.value})} required />
        <input type="number" placeholder="Editions" value={newArt.editions} onChange={e => setNewArt({...newArt, editions: e.target.value})} min={1} required />
        <select value={newArt.currency} onChange={e => setNewArt({...newArt, currency: e.target.value})}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="ZAR">ZAR</option>
        </select>
        <label>
          For Sale <input type="checkbox" checked={newArt.for_sale} onChange={e => setNewArt({...newArt, for_sale: e.target.checked})} />
        </label>
        <button type="submit">Add Artwork</button>
      </form>

      <ul>
        {artworks.map(a => (
          <li key={a.id}>
            <strong>{a.title}</strong> | {a.price} {a.currency} | Editions: {a.editions} | 
            {a.for_sale ? "For Sale" : "Not for Sale"} 
            <button onClick={() => toggleForSale(a.id, a.for_sale)}>
              Toggle Sale
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
