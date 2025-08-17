import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Sidebar from './components/Sidebar'
import Marketing from './components/Marketing.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import SetPassword from './components/SetPassword.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx' // new wrapper
import Insights from './components/dashboard/Insights.jsx'
import Inquiries from './components/dashboard/Inquiries.jsx'
import Messages from './components/dashboard/Messages.jsx'
import Sales from './components/dashboard/Sales.jsx'
import UploadWork from './components/UploadWork.jsx'
import Catalogue from './components/Catalogue.jsx'
import AccountSettings from './components/AccountSettings.jsx'
import OrderTracking from './components/OrderTracking.jsx'
import InquiryTracking from './components/InquiryTracking.jsx'
import SalesTracking from './components/SalesTracking.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Marketing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-password" element={<SetPassword />} />

        {/* Dashboard layout with sidebar + nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Insights />} /> {/* default dashboard view */}
          <Route path="insights" element={<Insights />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="messages" element={<Messages />} />
          <Route path="sales" element={<Sales />} />
        </Route>

        {/* Other tools outside of dashboard */}
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
