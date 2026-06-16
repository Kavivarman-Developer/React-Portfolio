import { FormData } from 'node:formdata'

function getBoundary(contentType = '') {
  const match = contentType.match(/boundary=(?:"([^\"]+)"|([^;]+))/i)
  return match?.[1] || match?.[2] || null
}

function parseMultipart(buffer, boundary) {
  const boundaryBuffer = Buffer.from(`--${boundary}`)
  const files = []
  let start = buffer.indexOf(boundaryBuffer)

  while (start !== -1) {
    start += boundaryBuffer.length
    if (buffer[start] === 45 && buffer[start + 1] === 45) break
    if (buffer[start] === 13 && buffer[start + 1] === 10) start += 2

    const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'), start)
    if (headerEnd === -1) break

    const headers = buffer.slice(start, headerEnd).toString('utf8')
    const filenameMatch = headers.match(/filename="([^\"]+)"/i)
    const typeMatch = headers.match(/content-type:\s*([^\r\n]+)/i)
    const dataStart = headerEnd + 4
    let nextBoundary = buffer.indexOf(boundaryBuffer, dataStart)
    if (nextBoundary === -1) break

    let dataEnd = nextBoundary
    if (buffer[dataEnd - 2] === 13 && buffer[dataEnd - 1] === 10) dataEnd -= 2

    if (filenameMatch) {
      files.push({
        originalName: filenameMatch[1],
        mimeType: typeMatch?.[1]?.trim() || 'application/octet-stream',
        data: buffer.slice(dataStart, dataEnd),
      })
    }

    start = nextBoundary
  }

  return files
}

async function streamToBuffer(stream) {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

async function uploadToCloudinary(file) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
  const folder = process.env.CLOUDINARY_FOLDER || 'react-portfolio-uploads'

  if (!cloudName || !uploadPreset) {
    throw new Error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in Vercel environment variables.'
    )
  }

  const formData = new FormData()
  formData.append('file', `data:${file.mimeType};base64,${file.data.toString('base64')}`)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', folder)
  formData.append('public_id', file.originalName.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]/g, '-'))

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
  const response = await fetch(url, { method: 'POST', body: formData })
  const result = await response.json()

  if (!response.ok) {
    const message = result.error?.message || 'Cloudinary upload failed'
    throw new Error(message)
  }

  return result.secure_url || result.url
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  const contentType = req.headers['content-type'] || ''
  const boundary = getBoundary(contentType)

  if (!boundary) {
    res.statusCode = 400
    res.end(JSON.stringify({ error: 'Missing multipart boundary' }))
    return
  }

  try {
    const buffer = await streamToBuffer(req)
    const files = parseMultipart(buffer, boundary)

    if (!files.length) {
      res.statusCode = 400
      res.end(JSON.stringify({ error: 'No file uploaded' }))
      return
    }

    const uploaded = []
    for (const file of files) {
      const url = await uploadToCloudinary(file)
      uploaded.push({
        fileName: file.originalName,
        mimeType: file.mimeType,
        url,
      })
    }

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ files: uploaded }))
  } catch (error) {
    console.error('Upload error:', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: error.message }))
  }
}
