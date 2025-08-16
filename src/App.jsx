import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Marketing from './components/Marketing'
import Signup from './components/Signup'
import Login from './components/Login'
import SetPassword from './components/SetPassword'
import Dashboard from './components/Dashboard'
import UploadWork from './components/UploadWork'
import Catalogue from './components/Catalogue'
import AccountSettings from './components/AccountSettings'
import OrderTracking from './components/OrderTracking'
import InquiryTracking from './components/InquiryTracking'
import SalesTracking from './components/SalesTracking'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Marketing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/uploadwork" element={<UploadWork />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/accountsettings" element={<AccountSettings />} />
        <Route path="/ordertracking" element={<OrderTracking />} />
        <Route path="/inquirytracking" element={<InquiryTracking />} />
        <Route path="/salestracking" element={<SalesTracking />} />
      </Routes>
    </Router>
  )
}
