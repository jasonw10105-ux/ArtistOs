import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Marketing from "./pages/Marketing";
import Auth from "./pages/Auth";
import SetPassword from "./pages/SetPassword";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
