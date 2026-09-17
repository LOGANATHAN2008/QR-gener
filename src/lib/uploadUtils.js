export const uploadFile = async (file, onProgress) => {
  const formData = new FormData()
  formData.append('file', file)
  
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://tmpfiles.org/api/v1/upload', true)
    
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress((e.loaded / e.total) * 100)
      }
    }
    
    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText)
          // tmpfiles returns {"status":"success","data":{"url":"https://tmpfiles.org/12345/filename.pdf"}}
          // User wants it to map to their domain instead:
          const url = response.data.url.replace('https://tmpfiles.org/', 'https://qr.loganathanm.in/')
          resolve(url)
        } catch (err) {
          reject(err)
        }
      } else {
        reject(new Error('Upload failed'))
      }
    }
    
    xhr.onerror = () => reject(new Error('Network error'))
    xhr.send(formData)
  })
}
