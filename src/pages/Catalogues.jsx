import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Catalogues() {
  const [catalogues, setCatalogues] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCatalogue, setNewCatalogue] = useState({ name: "", artwork_ids: [] });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) navigate("/auth");

      const { data: arts } = await supabase.from("artworks").select("*").eq("user_id", user.id);
      setArtworks(arts || []);

      const { data: cats } = await supabase.from("catalogues").select("*").eq("user_id", user.id);
      setCatalogues(cats || []);
      setLoading(false);
    }
    fetchData();
  }, [navigate]);

  async function createCatalogue(e) {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("catalogues").insert([{ ...newCatalogue, user_id: user.id }]).select();
    if (error) alert(error.message);
    else setCatalogues([...catalogues, data[0]]);
    setNewCatalogue({ name: "", artwork_ids: [] });
  }

  function toggleArtworkSelection(id) {
    if (newCatalogue.artwork_ids.includes(id)) {
      setNewCatalogue({...newCatalogue, artwork_ids: newCatalogue.artwork_ids.filter(aid => aid !== id)});
    } else {
      setNewCatalogue({...newCatalogue, artwork_ids: [...newCatalogue.artwork_ids, id]});
    }
  }

  if (loading) return <div>Loading catalogues...</div>;

  return (
    <div className="catalogues-page">
      <h1>Your Catalogues</h1>

      <form onSubmit={createCatalogue}>
        <input placeholder="Catalogue Name" value={newCatalogue.name} onChange={e => setNewCatalogue({...newCatalogue, name: e.target.value})} required />
        <fieldset>
          <legend>Select Artworks</legend>
          {artworks.map(a => (
            <label key={a.id}>
              <input type="checkbox" checked={newCatalogue.artwork_ids.includes(a.id)} onChange={() => toggleArtworkSelection(a.id)} />
              {a.title}
            </label>
          ))}
        </fieldset>
        <button type="submit">Create Catalogue</button>
      </form>

      <ul>
        {catalogues.map(c => (
          <li key={c.id}>
            <strong>{c.name}</strong> | Artworks: {c.artwork_ids.length}
          </li>
        ))}
      </ul>
    </div>
  );
}
