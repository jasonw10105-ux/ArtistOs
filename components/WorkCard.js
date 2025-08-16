export default function WorkCard({ work }) {
  return (
    <div style={{border:'1px solid #ccc', padding:'1rem', margin:'1rem 0'}}>
      <img src={work.image_url} alt={work.title} width="200"/>
      <h3>{work.title}</h3>
      <p>{work.description}</p>
      <p>Price: {work.price} {work.currency}</p>
      <p>Previous: {work.previous_price || '-'}</p>
      <p>Discount: {work.discount || 0}%</p>
    </div>
  )
}
