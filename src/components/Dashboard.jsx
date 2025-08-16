import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <button onClick={() => navigate('/uploadwork')} className="border p-4 rounded hover:bg-gray-50">Upload Work</button>
        <button onClick={() => navigate('/catalogue')} className="border p-4 rounded hover:bg-gray-50">Manage Catalogues</button>
        <button onClick={() => navigate('/ordertracking')} className="border p-4 rounded hover:bg-gray-50">Track Orders</button>
        <button onClick={() => navigate('/inquirytracking')} className="border p-4 rounded hover:bg-gray-50">Track Inquiries</button>
        <button onClick={() => navigate('/salestracking')} className="border p-4 rounded hover:bg-gray-50">Sales Overview</button>
        <button onClick={() => navigate('/accountsettings')} className="border p-4 rounded hover:bg-gray-50">Account Settings</button>
      </div>
    </div>
  )
}
