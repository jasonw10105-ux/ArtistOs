import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import Navbar from '../components/Navbar'
import UploadWork from '../components/UploadWork'
import WorkCard from '../components/WorkCard'
import CatalogueCard from '../components/CatalogueCard'
import Messaging from '../components/Messaging'
import SalesTracker from '../components/SalesTracker'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [works, setWorks] = useState([])
  const [catalogues, setCatalogues] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    const fetchWorks = async () => {
      const { data } = await supabase.from('works').select('*')
      setWorks(data)
    }

    const fetchCatalogues = async () => {
      const { data } = await supabase.from('catalogues').select('*')
      setCatalogues(data)
    }

    fetchUser()
    fetchWorks()
    fetchCatalogues()
  }, [])

  return (
    <div>
      <Navbar user={user} />
      <UploadWork fetchWorks={() => supabase.from('works').select('*').then(res => setWorks(res.data))} />
      <h2>Your Works</h2>
      {works.map(work => <WorkCard key={work.id} work={work} />)}
      <h2>Your Catalogues</h2>
      {catalogues.map(cat => <CatalogueCard key={cat.id} catalogue={cat} works={works.filter(w => w.catalogue_id === cat.id)} />)}
      <Messaging />
      <SalesTracker />
    </div>
  )
}
