'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AdminPage() {
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPending = async () => {
    try {
      const response = await axios.get('/api/moderation')
      setPending(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching pending:', err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPending()
  }, [])

  const handleAction = async (id, action) => {
    try {
      await axios.post('/api/moderation', { id, action })
      setPending(pending.filter(p => p.id !== id))
    } catch (err) {
      console.error('Error in handleAction:', err)
      alert('Error updating contribution status: ' + err.message)
    }
  }

  if (loading) return <div className="p-20 text-blue-500 tracking-widest text-[0.6rem] uppercase">Loading Moderation...</div>

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-12">
      <header className="mb-20 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase italic">Moderation Terminal</h1>
          <p className="text-[0.6rem] tracking-[0.4em] opacity-40 uppercase mt-2">
            Managing community silhouette contributions
          </p>
        </div>
        <div className="text-[0.6rem] tracking-widest opacity-40 border border-white/10 px-4 py-2">
          {pending.length} PENDING ENTRIES
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pending.map((contribution) => (
          <div key={contribution.id} className="bg-[#111] border border-white/10 p-6 flex flex-col group hover:border-blue-500/30 transition-all duration-500">
            <div className="relative aspect-square mb-6 overflow-hidden bg-white/5 border border-white/5">
              <img 
                src={contribution.thumbnailUrl} 
                alt="Contribution" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              />
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-[0.5rem] px-1 font-bold uppercase">
                ID #{contribution.id}
              </div>
            </div>

            <h3 className="font-bold text-sm tracking-widest uppercase mb-2 text-blue-400">
              {contribution.name}
            </h3>
            
            <p className="text-sm opacity-60 mb-8 italic grow">
              "{contribution.message}"
            </p>

            <div className="flex gap-2 mt-auto">
              <button 
                onClick={() => handleAction(contribution.id, 'approve')}
                className="flex-1 bg-green-900/30 border border-green-500/30 hover:bg-green-600 text-white py-3 text-[0.6rem] tracking-[0.3em] font-bold uppercase transition-all"
              >
                APPROVE
              </button>
              <button 
                onClick={() => handleAction(contribution.id, 'reject')}
                className="flex-1 bg-red-900/30 border border-red-500/30 hover:bg-red-600 text-white py-3 text-[0.6rem] tracking-[0.3em] font-bold uppercase transition-all"
              >
                REJECT
              </button>
            </div>
          </div>
        ))}
      </div>

      {pending.length === 0 && (
        <div className="text-center py-40 border border-dashed border-white/5 bg-white/1">
          <p className="text-[0.6rem] tracking-[0.5em] opacity-20 uppercase font-light">
            All clear. No pending contributions at this time.
          </p>
        </div>
      )}
    </div>
  )
}
