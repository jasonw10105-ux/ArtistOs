import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import WorkCard from '../components/WorkCard'

export default function Catalogue() {
  const { id } = useParams()
  const [catalogue, setCatalogue] = useState(null)
  const [works, setWorks] = useState([])
  const [password, setPassword] = useState('')
  const [accessGranted, setAccessGranted] = useState(false)

  useEffect(() => {
    if (id) fetchCatalogue()
  }, [id])

  const fetchCatalogue = async () => {
    const { data: cat } = await supabase.from('catalogues').select('*').eq('id', id).single()
    setCatalogue(cat)
    if (cat.is_public) {
      fetchWorks()
      setAccessGranted(true)
    }
  }

  const fetchWorks = async () => {
    const { data: cw } = await supabase.from('catalogue_works').select('work_id').eq('catalogue_id', id)
    const workIds = cw.map(c => c.work_id)
    const { data: workData } = await supabase.from('works').select('*').in('id', workIds)
    setWorks(workData)
  }

  const checkPassword = () => {
    if (password === catalogue.password) {
      fetchWorks()
      setAccessGranted(true)
    } else alert('Incorrect password')
  }

  if (!catalogue) return <p>Loading...</p>

  if (!catalogue.is_public && !accessGranted) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>{catalogue.title}</h2>
        <p>This catalogue is private. Enter password:</p>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={checkPassword}>Enter</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{catalogue.title}</h2>
      {works.map(work => <WorkCard key={work.id} work={work} />)}
    </div>
  )
}