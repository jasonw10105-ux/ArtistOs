import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Messaging() {
  const [messages, setMessages] = useState([])

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    setMessages(data)
  }

  useEffect(() => {
    fetchMessages()
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, fetchMessages)
      .subscribe()
    return () => supabase.removeChannel(subscription)
  }, [])

  return (
    <div style={{ margin:'2rem 0' }}>
      <h3>Collector Inquiries</h3>
      {messages.length === 0 && <p>No messages yet.</p>}
      {messages.map(msg => (
        <div key={msg.id} style={{ border:'1px solid #ccc', padding:'0.5rem', margin:'0.5rem 0' }}>
          <p><strong>From:</strong> {msg.sender_email}</p>
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  )
}