// src/lib/exportUtils.js
import jsPDF from 'jspdf'

export async function exportQR(qrInstance, format, filename = 'qrverse-code') {
  if (!qrInstance) throw new Error('No QR instance provided')

  switch (format) {
    case 'png':
      await qrInstance.download({ name: filename, extension: 'png' })
      break

    case 'jpg':
    case 'jpeg':
      await qrInstance.download({ name: filename, extension: 'jpeg' })
      break

    case 'svg':
      await qrInstance.download({ name: filename, extension: 'svg' })
      break

    case 'pdf': {
      // Get PNG blob from the QR instance
      const blob = await qrInstance.getRawData('png')
      if (!blob) throw new Error('Failed to get QR image data')

      const url = URL.createObjectURL(blob)
      const img = new Image()

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = url
      })

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const qrSize = 100
      const x = (pageWidth - qrSize) / 2

      // White background for QR
      pdf.setFillColor(255, 255, 255)
      pdf.rect(x - 4, 26, qrSize + 8, qrSize + 8, 'F')

      pdf.addImage(img, 'PNG', x, 30, qrSize, qrSize)

      // Branding
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 122, 255)
      pdf.text('QRVerse', pageWidth / 2, 148, { align: 'center' })

      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(120, 120, 120)
      pdf.text('Generated with QRVerse — qrverse.app', pageWidth / 2, 155, { align: 'center' })

      pdf.save(`${filename}.pdf`)
      URL.revokeObjectURL(url)
      break
    }

    default:
      throw new Error(`Unsupported export format: ${format}`)
  }
}
