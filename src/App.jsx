import MarketingPage from './components/Marketing.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import SetPassword from './components/SetPassword.jsx'
import UploadWork from './components/UploadWork.jsx'

<Routes>
  <Route path="/" element={<MarketingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/set-password" element={<SetPassword />} />
  <Route path="/upload" element={<UploadWork />} />
</Routes>
