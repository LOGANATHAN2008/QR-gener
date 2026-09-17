import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export default function FileRedirect() {
  const { fileId, fileName } = useParams()
  const [status, setStatus] = useState('Fetching your document...')

  useEffect(() => {
    async function fetchDirectLink() {
      try {
        if (!fileId || !fileName) return
        
        // The tmpfiles landing page URL
        const targetUrl = `https://tmpfiles.org/${fileId}/${fileName}`
        
        // We use allorigins.win to bypass CORS and fetch the HTML of the landing page
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
        
        const response = await fetch(proxyUrl)
        if (!response.ok) throw new Error('Proxy fetch failed')
        
        const html = await response.text()
        
        // Extract the hidden direct download link from the HTML button
        // Looking for: href="https://tmpfiles.org/dl/1234.abcd/fileId/fileName"
        const match = html.match(/href="(https:\/\/tmpfiles\.org\/dl\/[^"]+)"/)
        
        if (match && match[1]) {
          setStatus('Downloading your file...')
          // Redirect directly to the extracted download link, bypassing the landing page
          window.location.href = match[1]
        } else {
          // Fallback if parsing fails, send them to the landing page
          window.location.href = targetUrl
        }
      } catch (err) {
        console.error('Failed to parse direct link:', err)
        // Fallback to landing page if anything goes wrong
        window.location.href = `https://tmpfiles.org/${fileId}/${fileName}`
      }
    }
    
    fetchDirectLink()
  }, [fileId, fileName])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white text-center p-6 space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-[#8b5cf6]" />
      <h2 className="text-xl font-bold">{status}</h2>
      <p className="text-white/50 text-sm">Your download should start automatically.<br/>You can close this tab once it finishes.</p>
    </div>
  )
}
