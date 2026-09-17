import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { ref, get } from 'firebase/database'
import { database } from '../lib/firebase'

export default function FileRedirect() {
  const { fileName: fileId } = useParams()
  const [status, setStatus] = useState('Fetching your document...')
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchFile() {
      if (!fileId) return
      
      try {
        const fileRef = ref(database, `files/${fileId}`)
        const snapshot = await get(fileRef)
        
        if (snapshot.exists()) {
          const fileData = snapshot.val()
          
          setStatus('Downloading your file...')
          
          // Trigger a direct download using a hidden anchor tag
          const link = document.createElement('a')
          link.href = fileData.data
          link.download = fileData.name
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          setStatus('File downloaded successfully!')
        } else {
          setError('File not found or has been removed.')
        }
      } catch (err) {
        console.error("Download error:", err)
        setError('An error occurred while fetching the file.')
      }
    }

    fetchFile()
  }, [fileId])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white text-center p-6 space-y-4">
      {!error ? (
        <>
          {status !== 'File downloaded successfully!' && (
            <Loader2 className="w-10 h-10 animate-spin text-[#8b5cf6]" />
          )}
          <h2 className="text-xl font-bold">{status}</h2>
          <p className="text-white/50 text-sm">
            {status === 'File downloaded successfully!' 
              ? 'You can now close this tab.' 
              : 'Your download should start automatically.'}
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold text-red-400">Oops!</h2>
          <p className="text-white/70 text-sm">{error}</p>
        </>
      )}
    </div>
  )
}
