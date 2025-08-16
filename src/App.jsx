import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Marketing from "./pages/Marketing";
import Auth from "./pages/Auth";
import SetPassword from "./pages/SetPassword";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Artworks from "./pages/Artworks";
import Catalogues from "./pages/Catalogues";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/catalogues" element={<Catalogues />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}
