import jsPDF from 'jspdf'

export const generateCataloguePDF = (catalogueTitle, works) => {
  const doc = new jsPDF()
  doc.setFontSize(20)
  doc.text(catalogueTitle, 20, 20)
  let y = 40
  works.forEach((work, i) => {
    doc.setFontSize(14)
    doc.text(`${i + 1}. ${work.title} - ${work.price} ${work.currency}`, 20, y)
    y += 10
    if(work.description){
      doc.setFontSize(12)
      doc.text(work.description, 20, y)
      y += 10
    }
    if(y > 270) {
      doc.addPage()
      y = 20
    }
  })
  doc.save(`${catalogueTitle}.pdf`)
}
