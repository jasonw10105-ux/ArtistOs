import React from "react";
import { useNavigate } from "react-router-dom";

export default function Marketing() {
  const navigate = useNavigate();

  return (
    <div className="marketing-page">
      <header>
        <h1>🎨 ArtistOS</h1>
        <p>The platform for artists to showcase, catalogue, and sell their work.</p>
        <button className="btn btn-primary" onClick={() => navigate("/auth")}>
          Log In / Sign Up
        </button>
      </header>
    </div>
  );
}
