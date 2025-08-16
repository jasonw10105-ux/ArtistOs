import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function UploadWork({ fetchWorks }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const handleUpload = async () => {
    if(!imageFile) return alert('Select an image!')
    const { data, error } = await supabase.storage.from('works').upload(`images/${imageFile.name}`, imageFile)
    if(error) return alert(error.message)
    const imageUrl = data.path
    const { error: insertError } = await supabase.from('works').insert({
      title, description, price, image_url: imageUrl
    })
    if(insertError) alert(insertError.message)
    else fetchWorks()
  }

  return (
    <div className="upload-work">
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}/>
      <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)}/>
      <input type="file" onChange={e=>setImageFile(e.target.files[0])}/>
      <button onClick={handleUpload}>Upload Work</button>
    </div>
  )
}
