import { useNavigate } from "react-router-dom";

export default function MarketingPage() {
  const navigate = useNavigate();

  return (
    <div className="marketing-page">
      <header className="marketing-header">
        <h1>🎨 ArtistOS</h1>
        <nav>
          <button onClick={() => navigate("/auth")} className="btn btn-primary">
            Log in / Sign up
          </button>
        </nav>
      </header>

      <section className="hero">
        <h2>The easiest way to showcase and sell your art online</h2>
        <p>
          Upload works, build catalogues, track sales, and share with collectors.
        </p>
        <button onClick={() => navigate("/auth")} className="btn btn-primary">
          Get Started Free
        </button>
      </section>
    </div>
  );
}
