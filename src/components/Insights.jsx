import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Insights() {
  const [insights, setInsights] = useState({
    inquiries: [],
    messages: [],
    sales: []
  })
  const [loading, setLoading] = useState(true)

  // Fetch top 5 function (reusable for refresh)
  const fetchData = async () => {
    setLoading(true)

    const { data: inquiries } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    const { data: messages } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    const { data: sales } = await supabase
      .from('sales')
      .select('*')
      .order('amount', { ascending: false })
      .limit(5)

    setInsights({
      inquiries: inquiries || [],
      messages: messages || [],
      sales: sales || []
    })

    setLoading(false)
  }

  useEffect(() => {
    fetchData()

    // Realtime subscriptions
    const inquiriesSub = supabase
      .channel('inquiries-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => {
        fetchData()
      })
      .subscribe()

    const messagesSub = supabase
      .channel('messages-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {
        fetchData()
      })
      .subscribe()

    const salesSub = supabase
      .channel('sales-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sales' }, () => {
        fetchData()
      })
      .subscribe()

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(inquiriesSub)
      supabase.removeChannel(messagesSub)
      supabase.removeChannel(salesSub)
    }
  }, [])

  if (loading) {
    return <p>Loading insights...</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Top 5 Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Inquiries */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold mb-2">Inquiries</h2>
          <ol className="list-decimal ml-4">
            {insights.inquiries.map((inq) => (
              <li key={inq.id}>
                {inq.subject || 'Untitled'} <span className="text-gray-500">({new Date(inq.created_at).toLocaleDateString()})</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Messages */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold mb-2">Messages</h2>
          <ol className="list-decimal ml-4">
            {insights.messages.map((msg) => (
              <li key={msg.id}>
                <span className="font-medium">{msg.sender || 'Anonymous'}:</span> {msg.content?.slice(0, 30)}...
              </li>
            ))}
          </ol>
        </div>

        {/* Sales */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold mb-2">Sales</h2>
          <ol className="list-decimal ml-4">
            {insights.sales.map((sale) => (
              <li key={sale.id}>
                ${sale.amount} <span className="text-gray-500">– {sale.buyer}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
