import { supabase } from '../utils/supabaseClient'

export default function WorkCard({ work }) {
  const [imageUrl, setImageUrl] = useState('')

  const fetchImage = async () => {
    const { data, error } = await supabase.storage.from('works').getPublicUrl(work.image_url)
    if (!error) setImageUrl(data.publicUrl)
  }

  useEffect(() => {
    if (work.image_url) fetchImage()
  }, [work.image_url])

  return (
    <div style={{ border:'1px solid #ddd', padding:'1rem', borderRadius:'8px', margin:'1rem 0' }}>
      {imageUrl && <img src={imageUrl} alt={work.title} style={{ width:'100%', maxHeight:'300px', objectFit:'cover' }} />}
      <h4>{work.title}</h4>
      <p>{work.description}</p>
      <p>Price: {work.price} {work.currency}</p>
      <p>Editions: {work.editions}</p>
    </div>
  )
}