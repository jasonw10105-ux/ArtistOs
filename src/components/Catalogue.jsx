import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Catalogue() {
  const [catalogues, setCatalogues] = useState([])

  useEffect(() => {
    const fetchCatalogues = async () => {
      const { data, error } = await supabase.from('catalogues').select('*')
      if (error) console.error(error)
      else setCatalogues(data)
    }
    fetchCatalogues()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Catalogues</h2>
      {catalogues.length === 0 && <p>No catalogues created yet.</p>}
      <ul className="space-y-2">
        {catalogues.map((c) => (
          <li key={c.id} className="border p-2 rounded hover:bg-gray-50">{c.name} — {c.is_public ? 'Public' : 'Private'}</li>
        ))}
      </ul>
    </div>
  )
}
