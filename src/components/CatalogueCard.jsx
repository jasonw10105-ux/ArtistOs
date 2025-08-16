import { generateCataloguePDF } from '../utils/pdfGenerator'

export default function CatalogueCard({ catalogue, works }) {
  const handleDownload = () => {
    generateCataloguePDF(catalogue.title, works)
  }

  return (
    <div style={{ border:'1px solid #aaa', padding:'1rem', borderRadius:'8px', margin:'1rem 0' }}>
      <h4>{catalogue.title}</h4>
      <p>{catalogue.is_public ? 'Public' : 'Private'}</p>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  )
}