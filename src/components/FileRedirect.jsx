import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export default function FileRedirect() {
  const { fileName } = useParams()

  useEffect(() => {
    if (!fileName) return
    
    // Redirect directly to the permanent Firebase Storage file URL
    const firebaseUrl = `https://storage.googleapis.com/qrverse-a43dc.appspot.com/uploads/${fileName}`
    window.location.href = firebaseUrl
  }, [fileName])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white text-center p-6 space-y-4">
      <Loader2 className="w-10 h-10 animate-spin text-[#8b5cf6]" />
      <h2 className="text-xl font-bold">Downloading your file...</h2>
      <p className="text-white/50 text-sm">Your download should start automatically.<br/>You can close this tab once it finishes.</p>
    </div>
  )
}
