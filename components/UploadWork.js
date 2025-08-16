import React, { useState } from 'react'
import supabase from '../lib/supabaseClient'

export default function UploadWork() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [editions, setEditions] = useState(1)
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!file) {
      setMessage('Please select an image')
      return
    }

    try {
      // Upload file to Supabase storage
      const fileName = `${Date.now()}-${file.name}`
      const { error: storageError } = await supabase.storage
        .from('works')
        .upload(fileName, file)

      if (storageError) throw storageError

      // Insert work metadata into Supabase table
        const { error: dbError } = await supabase.from('works').insert([
        {
          title,
          description,
          price,
          currency,
          editions,
          image_url: fileName,
        },
      ])  // <-- must end like this, not `})`

      if (dbError) throw dbError

      setMessage('Work uploaded successfully!')
      setTitle('')
      setDescription('')
      setPrice('')
      setCurrency('USD')
      setEditions(1)
      setFile(null)
    } catch (err) {
      console.error(err)
      setMessage(`Error: ${err.message}`)
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Upload New Work</h2>
      {message && <p className="mb-2 text-sm text-blue-600">{message}</p>}
      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="ZAR">ZAR</option>
        </select>
        <input
          type="number"
          placeholder="Editions"
          value={editions}
          onChange={(e) => setEditions(Number(e.target.value))}
          className="border p-2 w-full"
          min="1"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  )
}
