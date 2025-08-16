import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function OrderTracking() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
      if (error) console.error(error)
      else setOrders(data)
    }
    fetchOrders()
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? <p>No orders yet.</p> :
        <ul className="space-y-2">
          {orders.map(order => (
            <li key={order.id} className="border p-2 rounded hover:bg-gray-50">
              {order.work_title} — {order.status} — {order.quantity} × {order.price} {order.currency}
            </li>
          ))}
        </ul>
      }
    </div>
  )
}
