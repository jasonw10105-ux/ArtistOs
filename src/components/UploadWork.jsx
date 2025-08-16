import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function UploadWork({ fetchWorks }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [file, setFile] = useState(null)
  const [editions, setEditions] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return alert('Select a file first.')
    setLoading(true)

    const fileName = `${Date.now()}_${file.name}`
    const { data, error: uploadError } = await supabase.storage.from('works').upload(fileName, file)
    if (uploadError) return alert(uploadError.message)

    const { data: workData, error: insertError } = await supabase.from('works').insert({
      title,
      description,
      price,
      currency,
      editions,
      image_url: fileName
    })
    if (insertError) return alert(insertError.message)

    setTitle('')
    setDescription('')
    setPrice('')
    setFile(null)
    setEditions(1)
    fetchWorks()
    setLoading(false)
  }

  return (
    <div style={{ border:'1px solid #ccc', padding:'1rem', margin:'1rem 0', borderRadius:'8px' }}>
      <h3>Upload New Work</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
      <select value={currency} onChange={e => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ZAR">ZAR</option>
      </select>
      <input type="number" value={editions} onChange={e => setEditions(e.target.value)} min={1} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Work'}
      </button>
    </div>
  )
}