import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Marketing() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-4 text-center">
      <header className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Showcase Your Art to the World
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Create digital catalogues, sell your works, and connect with collectors — all in one platform designed for artists.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => navigate('/signup')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/login')}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Login
        </button>
      </div>
    </div>
  )
}
