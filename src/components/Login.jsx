import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else navigate('/dashboard')
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
    if (error) setMessage(error.message)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full p-6 border rounded-lg shadow bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {message && <p className="mb-2 text-sm text-blue-600">{message}</p>}
        <form onSubmit={handleEmailLogin} className="space-y-3">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full rounded" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Login</button>
        </form>
        <button onClick={handleGoogleLogin} className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full">Continue with Google</button>
        <p className="mt-4 text-gray-600 text-sm">
          Don't have an account? <span onClick={() => navigate('/signup')} className="text-blue-600 cursor-pointer hover:underline">Sign Up</span>
        </p>
      </div>
    </div>
  )
}
