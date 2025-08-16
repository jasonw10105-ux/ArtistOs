import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function SalesTracker() {
  const [sales, setSales] = useState([])

  const fetchSales = async () => {
    const { data } = await supabase.from('sales').select('*').order('created_at', { ascending: false })
    setSales(data)
  }

  useEffect(() => {
    fetchSales()
    const subscription = supabase
      .channel('sales')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sales' }, fetchSales)
      .subscribe()
    return () => supabase.removeChannel(subscription)
  }, [])

  return (
    <div style={{ margin:'2rem 0' }}>
      <h3>Sales Tracker</h3>
      {sales.length === 0 && <p>No sales yet.</p>}
      {sales.map(sale => (
        <div key={sale.id} style={{ border:'1px solid #ccc', padding:'0.5rem', margin:'0.5rem 0' }}>
          <p><strong>Work ID:</strong> {sale.work_id}</p>
          <p><strong>Price:</strong> {sale.price} {sale.currency}</p>
          <p><strong>Buyer:</strong> {sale.buyer_email}</p>
        </div>
      ))}
    </div>
  )
}