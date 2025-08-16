import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function SalesTracking() {
  const [sales, setSales] = useState([])

  useEffect(() => {
    const fetchSales = async () => {
      const { data, error } = await supabase.from('sales').select('*').order('created_at', { ascending: false })
      if (error) console.error(error)
      else setSales(data)
    }
    fetchSales()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sales Overview</h2>
      {sales.length === 0 ? <p>No sales yet.</p> :
        <ul className="space-y-2">
          {sales.map(s => (
            <li key={s.id} className="border p-2 rounded hover:bg-gray-50">
              {s.work_title} — {s.quantity} × {s.price} {s.currency} — {new Date(s.created_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      }
    </div>
  )
}
