import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components (exact file names and casing)
import Marketing from './components/Marketing.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import SetPassword from './components/SetPassword.jsx'
import Dashboard from './components/Dashboard.jsx'
import UploadWork from './components/UploadWork.jsx'
import Catalogue from './components/Catalogue.jsx'
import AccountSettings from './components/AccountSettings.jsx'
import InquiryTracking from './components/InquiryTracking.jsx'
import SalesTracking from './components/SalesTracking.jsx'

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
        <Route path="/inquirytracking" element={<InquiryTracking />} />
        <Route path="/salestracking" element={<SalesTracking />} />
      </Routes>
    </Router>
  )
}
