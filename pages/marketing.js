import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

export default function Marketing() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true) // toggle login/signup

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if(error) alert(error.message)
    else router.push('/dashboard')
  }

  const handleSignup = async () => {
    const { user, error } = await supabase.auth.signUp({ email, password }, {
      redirectTo: window.location.origin + '/dashboard'
    })
    if(error) alert(error.message)
    else alert('Check your email to verify your account!')
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', padding:'2rem', textAlign:'center' }}>
      <h1>Welcome to Artist Hub</h1>
      <p>Upload your art, create catalogues, track inquiries and sales—all in one platform.</p>

      <div style={{ marginTop:'2rem', border:'1px solid #ccc', padding:'2rem', borderRadius:'8px', width:'300px' }}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          style={{width:'100%', margin:'0.5rem 0', padding:'0.5rem'}}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          style={{width:'100%', margin:'0.5rem 0', padding:'0.5rem'}}
        />

        {isLogin ? (
          <button style={{width:'100%', margin:'0.5rem 0', padding:'0.5rem'}} onClick={handleLogin}>Login</button>
        ) : (
          <button style={{width:'100%', margin:'0.5rem 0', padding:'0.5rem'}} onClick={handleSignup}>Sign Up</button>
        )}

        <p style={{marginTop:'1rem'}}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button style={{marginLeft:'0.5rem', color:'blue'}} onClick={()=>setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>

      <p style={{marginTop:'2rem', fontSize:'0.9rem', color:'#555'}}>
        Manage your art professionally and connect with collectors today.
      </p>
    </div>
  )
}
