import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from './firebase'

export const uploadFile = async (file, onProgress) => {
  return new Promise((resolve, reject) => {
    try {
      const storage = getStorage(app)
      // Clean filename for safety and URL
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const uniqueName = `${Date.now()}_${cleanName}`
      
      const storageRef = ref(storage, `uploads/${uniqueName}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          if (onProgress) onProgress(progress)
        },
        (error) => {
          console.error("Firebase upload error:", error)
          reject(error)
        },
        () => {
          // Success! We don't need the Firebase download URL because we map it via our custom domain
          // Generate the branded URL
          const brandedUrl = `https://qr.loganathanm.in/f/${uniqueName}`
          resolve(brandedUrl)
        }
      )
    } catch (err) {
      reject(err)
    }
  })
}
