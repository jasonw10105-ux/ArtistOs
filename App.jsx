import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Marketing from './pages/Marketing'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Catalogue from './pages/Catalogue'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/marketing" />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catalogue/:id" element={<Catalogue />} />
      </Routes>
    </Router>
  )
}