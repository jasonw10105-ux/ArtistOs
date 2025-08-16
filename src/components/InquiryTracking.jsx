import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function InquiryTracking() {
  const [inquiries, setInquiries] = useState([])

  useEffect(() => {
    const fetchInquiries = async () => {
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
      if (error) console.error(error)
      else setInquiries(data)
    }
    fetchInquiries()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inquiries</h2>
      {inquiries.length === 0 ? <p>No inquiries yet.</p> :
        <ul className="space-y-2">
          {inquiries.map(i => (
            <li key={i.id} className="border p-2 rounded hover:bg-gray-50">
              <strong>{i.name}</strong> ({i.email}): {i.message}
            </li>
          ))}
        </ul>
      }
    </div>
  )
}
