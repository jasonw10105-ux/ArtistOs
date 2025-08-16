import React, { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/set-password` },
    })
    if (error) setMessage(error.message)
    else setMessage('Check your email for a verification link')
  }

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/set-password` },
    })
    if (error) setMessage(error.message)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full p-6 border rounded-lg shadow bg-white">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {message && <p className="mb-2 text-sm text-blue-600">{message}</p>}
        <form onSubmit={handleSignup} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
            Sign up with Email
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleSignup}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
