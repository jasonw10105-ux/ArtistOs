import { generateCataloguePDF } from '../utils/pdfGenerator'
import Link from 'next/link'

export default function CatalogueCard({ catalogue, works }) {
  const handleDownload = () => generateCataloguePDF(catalogue.title, works)

  const publicUrl = `/catalogue/${catalogue.id}`

  return (
    <div style={{border:'1px solid #ccc', padding:'1rem', margin:'1rem 0'}}>
      <h3>{catalogue.title}</h3>
      <p>{catalogue.is_public ? 'Public' : 'Private'}</p>
      <Link href={publicUrl}><button>View Catalogue</button></Link>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  )
}
