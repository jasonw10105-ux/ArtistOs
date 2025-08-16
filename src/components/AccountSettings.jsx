import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function AccountSettings() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setEmail(data.user?.email || '')
    }
    getUser()
  }, [])

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({ email })
    if (error) setMessage(error.message)
    else setMessage('Account updated successfully!')
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
      {message && <p className="mb-2 text-blue-600">{message}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full rounded mb-2" />
      <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
    </div>
  )
}
