import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet /> {/* nested routes render here */}
      </main>
    </div>
  )
}
