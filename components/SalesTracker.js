import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function SalesTracker() {
  const [sales, setSales] = useState([])

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = async () => {
    const { data } = await supabase.from('sales').select('*').order('created_at', { ascending: false })
    setSales(data)
  }

  return (
    <div style={{padding:'1rem', border:'1px solid #ccc', margin:'1rem 0'}}>
      <h2>Sales</h2>
      {sales.length === 0 && <p>No sales yet.</p>}
      {sales.map(sale => (
        <div key={sale.id} style={{border:'1px solid #ddd', padding:'0.5rem', margin:'0.5rem 0'}}>
          <p>Collector: {sale.collector_name}</p>
          <p>Price: {sale.price} {sale.currency}</p>
          <p>Work ID: {sale.work_id}</p>
        </div>
      ))}
    </div>
  )
}
