import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Messaging() {
  const [inquiries, setInquiries] = useState([])

  useEffect(() => {
    fetchInquiries()
    // Real-time subscription
    const subscription = supabase
      .channel('public:inquiries')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inquiries' }, payload => {
        setInquiries(prev => [payload.new, ...prev])
      })
      .subscribe()
    return () => supabase.removeChannel(subscription)
  }, [])

  const fetchInquiries = async () => {
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    setInquiries(data)
  }

  const markAsRead = async (id) => {
    await supabase.from('inquiries').update({ read: true }).eq('id', id)
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, read: true } : i))
  }

  return (
    <div style={{padding:'1rem', border:'1px solid #ccc', margin:'1rem 0'}}>
      <h2>Inquiries</h2>
      {inquiries.length === 0 && <p>No inquiries yet.</p>}
      {inquiries.map(inq => (
        <div key={inq.id} style={{border:'1px solid #ddd', padding:'0.5rem', margin:'0.5rem 0', backgroundColor: inq.read ? '#f0f0f0' : '#fff'}}>
          <p><strong>{inq.collector_name}</strong> ({inq.collector_email})</p>
          <p>{inq.message}</p>
          {!inq.read && <button onClick={()=>markAsRead(inq.id)}>Mark as Read</button>}
        </div>
      ))}
    </div>
  )
}
