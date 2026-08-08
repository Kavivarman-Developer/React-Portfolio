import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadDir = path.resolve(__dirname, 'upload')

const mimeTypes = {
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.png': 'image/png',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
}

function sanitizeFileName(name) {
  const ext = path.extname(name).toLowerCase()
  const base = path
    .basename(name, ext)
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'upload'

  return `${Date.now()}-${Math.random().toString(36).slice(2)}-${base}${ext}`
}

function getBoundary(contentType = '') {
  const match = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i)
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
    const filenameMatch = headers.match(/filename="([^"]+)"/i)
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

function localUploadPlugin() {
  const configureUploadMiddleware = (server) => {
    fs.mkdirSync(uploadDir, { recursive: true })

    server.middlewares.use('/api/upload', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      const boundary = getBoundary(req.headers['content-type'])
      if (!boundary) {
        res.statusCode = 400
        res.end(JSON.stringify({ error: 'Missing multipart boundary' }))
        return
      }

      const chunks = []
      req.on('data', (chunk) => chunks.push(chunk))
      req.on('end', () => {
        try {
          const files = parseMultipart(Buffer.concat(chunks), boundary)
          const saved = files.map((file) => {
            const fileName = sanitizeFileName(file.originalName)
            const filePath = path.join(uploadDir, fileName)
            fs.writeFileSync(filePath, file.data) 
            return {
              fileName,
              originalName: file.originalName,
              mimeType: file.mimeType,
              url: `/upload/${fileName}`,
            }
          })

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ files: saved }))
        } catch (error) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: error.message }))
        }
      })
    })

    server.middlewares.use('/upload', (req, res, next) => {
      const requested = decodeURIComponent((req.url || '').split('?')[0]).replace(/^\/+/, '')
      const filePath = path.resolve(uploadDir, requested)

      if (!filePath.startsWith(uploadDir) || !fs.existsSync(filePath)) {
        next()
        return
      }

      res.setHeader('Content-Type', mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream')
      fs.createReadStream(filePath).pipe(res)
    })
  }

  return {
    name: 'local-upload-plugin',
    configureServer(server) {
      configureUploadMiddleware(server)
    },
    configurePreviewServer(server) {
      configureUploadMiddleware(server)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localUploadPlugin()
  ],
  base: '/React-Portfolio/',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
})
