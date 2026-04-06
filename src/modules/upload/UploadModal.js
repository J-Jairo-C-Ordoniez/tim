'use client'

import React, { useState } from 'react'
import axios from 'axios'

export default function UploadModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !name || !message) return

    setIsUploading(true)
    try {
      // 1. Convert file to base64 for API
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = async () => {
        const base64Content = reader.result
        
        // 2. Call API
        try {
          await axios.post('/api/upload', {
            fileContent: base64Content,
            name,
            message
          })
          
          alert('Tu memoria ha sido enviada para moderacin. Gracias!')
          resetForm()
          onClose()
        } catch (err) {
          console.error('Error uploading:', err)
          alert('Hubo un error al subir tu memoria: ' + (err.response?.data?.error || err.message))
        } finally {
          setIsUploading(false)
        }
      }
    } catch (err) {
      console.error('Error in handleSubmit:', err)
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setName('')
    setMessage('')
    setPreview(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-[#111] border border-white/10 p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors uppercase text-[0.6rem] tracking-widest"
        >
          CLOSE
        </button>

        <h2 className="text-2xl font-bold mb-6 tracking-tighter uppercase italic text-blue-500">
          ADD YOUR MEMORY
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-[0.6rem] tracking-[0.3em] font-light opacity-60 mb-2 uppercase">
              Select Image
            </label>
            <div className="relative h-40 border border-white/10 flex items-center justify-center overflow-hidden bg-white/5 transition-all group-hover:border-blue-500/50">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <div className="text-[0.6rem] tracking-widest opacity-40 mb-2">+ UPLOAD</div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.3em] font-light opacity-60 mb-2 uppercase">
              Your Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-blue-500/50 outline-none transition-colors"
              placeholder="AVICII FAN"
              required
            />
          </div>

          <div>
            <label className="block text-[0.6rem] tracking-[0.3em] font-light opacity-60 mb-2 uppercase">
              Your Message
            </label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-blue-500/50 outline-none transition-colors h-24 resize-none"
              placeholder="What did Tim's music mean to you?"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isUploading}
            className={`w-full py-4 tracking-[0.5em] text-[0.7rem] uppercase transition-all ${isUploading ? 'bg-white/20' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            {isUploading ? 'UPLOADING...' : 'SUBMIT TO SILHOUETTE'}
          </button>
        </form>
      </div>
    </div>
  )
}
