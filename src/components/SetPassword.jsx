import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function SetPassword() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) setMessage(error.message)
      else setUser(data.user)
    }
    getUser()
  }, [])

  const handleSetPassword = async (e) => {
    e.preventDefault()
    if (password.length < 8) return setMessage('Password must be at least 8 characters')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setMessage(error.message)
    else setMessage('Password set successfully!')
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full p-6 border rounded-lg shadow bg-white">
        <h2 className="text-2xl font-bold mb-4">Set Your Password</h2>
        {message && <p className="mb-2 text-sm text-blue-600">{message}</p>}
        <form onSubmit={handleSetPassword} className="space-y-3">
          <input
            type="password"
            placeholder="Choose a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">Save Password</button>
        </form>
      </div>
    </div>
  )
}
