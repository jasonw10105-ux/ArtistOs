import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    const { user, error } = await supabase.auth.signUp({ email, password }, {
      redirectTo: window.location.origin + '/dashboard'
    })
    if(error) alert(error.message)
    else alert('Check your email to verify your account!')
  }

  return (
    <div style={{padding:'2rem'}}>
      <h1>Artist Signup</h1>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  )
}
