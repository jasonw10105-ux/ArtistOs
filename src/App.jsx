import { BrowserRouter, Routes, Route } from "react-router-dom";
import MarketingPage from "./marketing/MarketingPage";
import Auth from "./auth/Auth";
import SetPassword from "./auth/SetPassword";
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
