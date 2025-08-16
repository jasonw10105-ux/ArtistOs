import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import SetPassword from './components/SetPassword.jsx'
import UploadWork from './components/UploadWork.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/upload" element={<UploadWork />} />
        {/* add other routes as needed */}
      </Routes>
    </Router>
  )
}
