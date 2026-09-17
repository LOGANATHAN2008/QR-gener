import { ref, set } from 'firebase/database'
import { database } from './firebase'

export const uploadFile = async (file, onProgress) => {
  return new Promise((resolve, reject) => {
    try {
      if (onProgress) onProgress(10) // Initial progress
      
      const reader = new FileReader()
      
      reader.onload = async () => {
        try {
          if (onProgress) onProgress(50) // Reading complete
          
          const base64Data = reader.result
          
          const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
          const uniqueId = Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
          
          // Save to Firebase Realtime Database (100% Free, no billing required)
          const fileRef = ref(database, `files/${uniqueId}`)
          
          await set(fileRef, {
            name: cleanName,
            type: file.type,
            size: file.size,
            data: base64Data,
            createdAt: Date.now()
          })
          
          if (onProgress) onProgress(100) // Upload complete
          
          // Generate the branded URL mapping to this ID
          const brandedUrl = `https://qr.loganathanm.in/f/${uniqueId}`
          resolve(brandedUrl)
          
        } catch (err) {
          console.error("Database upload error:", err)
          reject(new Error("Failed to save to database. It might be too large."))
        }
      }
      
      reader.onerror = () => {
        reject(new Error("Failed to read file"))
      }
      
      // Read file as Data URL (Base64)
      reader.readAsDataURL(file)
      
    } catch (err) {
      reject(err)
    }
  })
}
