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