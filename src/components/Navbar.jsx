import { supabase } from '../utils/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ user }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/marketing')
  }

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <span style={{ fontWeight: 'bold' }}>Artist Hub</span>
      {user ? <button onClick={handleLogout}>Logout</button> : <></>}
    </nav>
  )
}