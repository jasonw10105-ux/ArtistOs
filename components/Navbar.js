import Link from 'next/link'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

export default function Navbar({ user }) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav style={{ display:'flex', justifyContent:'space-between', padding:'1rem', borderBottom:'1px solid #ccc' }}>
      <Link href="/dashboard">Dashboard</Link>
      {user ? <button onClick={handleLogout}>Logout</button> : <Link href="/signup">Signup</Link>}
    </nav>
  )
}
