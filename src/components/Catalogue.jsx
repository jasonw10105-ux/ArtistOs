import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Catalogue() {
  const [catalogues, setCatalogues] = useState([])
  const [passwordPrompt, setPasswordPrompt] = useState(null)
  const [passwordInput, setPasswordInput] = useState('')
  const [unlockedCatalogues, setUnlockedCatalogues] = useState(new Set())

  useEffect(() => {
    const fetchCatalogues = async () => {
      const { data, error } = await supabase.from('catalogues').select('*')
      if (error) console.error(error)
      else setCatalogues(data)
    }
    fetchCatalogues()
  }, [])

  const handleCatalogueClick = async (catalogue) => {
    // If it's public or already unlocked, show it directly
    if (catalogue.is_public || unlockedCatalogues.has(catalogue.id)) {
      // Navigate to catalogue view or show content
      console.log('Viewing catalogue:', catalogue.name)
      return
    }

    // If it has a password, prompt for it
    if (catalogue.password) {
      setPasswordPrompt(catalogue)
      setPasswordInput('')
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (!passwordPrompt) return

    // In a real app, you might want to hash the password before comparing
    // For security, consider storing hashed passwords in the database
    if (passwordInput === passwordPrompt.password) {
      // Add to unlocked catalogues
      setUnlockedCatalogues(prev => new Set([...prev, passwordPrompt.id]))
      setPasswordPrompt(null)
      setPasswordInput('')
      
      // Now view the catalogue
      console.log('Viewing unlocked catalogue:', passwordPrompt.name)
    } else {
      alert('Incorrect password')
      setPasswordInput('')
    }
  }

  const closePasswordPrompt = () => {
    setPasswordPrompt(null)
    setPasswordInput('')
  }

  const getVisibilityStatus = (catalogue) => {
    if (catalogue.is_public) return 'Public'
    if (catalogue.password) return 'Password Protected'
    return 'Private'
  }

  const getVisibilityColor = (catalogue) => {
    if (catalogue.is_public) return 'text-green-600'
    if (catalogue.password) return 'text-yellow-600'
    return 'text-gray-600'
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Catalogues</h2>
      
      {catalogues.length === 0 && (
        <p className="text-gray-500">No catalogues created yet.</p>
      )}
      
      <ul className="space-y-2">
        {catalogues.map((c) => (
          <li 
            key={c.id} 
            className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => handleCatalogueClick(c)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{c.name}</h3>
                <p className="text-sm text-gray-600">{c.description || 'No description'}</p>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${getVisibilityColor(c)}`}>
                  {getVisibilityStatus(c)}
                </span>
                {unlockedCatalogues.has(c.id) && (
                  <div className="text-xs text-green-500 mt-1">✓ Unlocked</div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Password Prompt Modal */}
      {passwordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Enter Password for "{passwordPrompt.name}"
            </h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={closePasswordPrompt}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
