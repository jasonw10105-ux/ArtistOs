import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [catalogues, setCatalogues] = useState([]);
  const navigate = useNavigate();

  // Load session & user profile
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return navigate("/"); // Not logged in
      setUser(session.user);

      // Fetch profile info
      supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()
        .then(({ data, error }) => {
          if (error) console.error(error);
          else setUser({ ...session.user, ...data });
        });
    });

    // Load artworks
    fetchArtworks();
    fetchCatalogues();
  }, []);

  async function fetchArtworks() {
    const { data, error } = await supabase
      .from("artworks")
      .select("*")
      .eq("artist_id", user?.id);
    if (error) console.error(error);
    else setArtworks(data || []);
  }

  async function fetchCatalogues() {
    const { data, error } = await supabase
      .from("catalogues")
      .select("*")
      .eq("artist_id", user?.id);
    if (error) console.error(error);
    else setCatalogues(data || []);
  }

  function handleLogout() {
    supabase.auth.signOut().then(({ error }) => {
      if (error) alert(error.message);
      navigate("/"); // back to login/signup
    });
  }

  function handleAddArtwork() {
    navigate("/add-artwork"); // Assuming you have this route
  }

  function handleCreateCatalogue() {
    navigate("/create-catalogue"); // Assuming you have this route
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user?.display_name || user?.email}</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <section className="dashboard-actions" style={{ margin: "20px 0" }}>
        <button className="btn btn-primary" onClick={handleAddArtwork}>
          Add Artwork
        </button>
        <button className="btn btn-primary" onClick={handleCreateCatalogue}>
          Create Catalogue
        </button>
      </section>

      <section className="dashboard-content">
        <h2>Your Artworks</h2>
        {artworks.length === 0 ? (
          <p>No artworks yet.</p>
        ) : (
          <div className="artwork-grid">
            {artworks.map((art) => (
              <div key={art.id} className="artwork-card">
                <img src={art.image_url} alt={art.title} width={200} />
                <h3>{art.title}</h3>
                <p>{art.description}</p>
                {art.for_sale && <p>Price: {art.price} {art.currency}</p>}
              </div>
            ))}
          </div>
        )}

        <h2>Your Catalogues</h2>
        {catalogues.length === 0 ? (
          <p>No catalogues yet.</p>
        ) : (
          <div className="catalogue-grid">
            {catalogues.map((cat) => (
              <div key={cat.id} className="catalogue-card">
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
