import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import SetPassword from './components/SetPassword'
import UploadWork from './components/UploadWork'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/upload" element={<UploadWork />} />
        {/* add your other routes here */}
      </Routes>
    </Router>
  )
}
