'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import ContributionCard from '../ui/ContributionCard'

export default function ModerationPanel() {
    const [pending, setPending] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchPending = async () => {
        try {
            const response = await axios.get('/api/moderation')
            setPending(response.data)
        } catch (err) {
            setError('Error fetching moderation entries.')
        } finally {
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
            alert('Action failed: ' + err.message)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-10 h-px bg-primary/20 animate-pulse" />
                <p className="text-xs tracking-[0.4em] uppercase text-primary/40 font-medium">
                    Loading entries
                </p>
            </div>
        )
    }

    return (
        <section className="w-full space-y-12 animate-in fade-in duration-700">
            <header className="flex justify-between items-end border-b border-white/5 pb-8 overflow-hidden">
                <div className="space-y-1">
                    <p className="text-[9px] tracking-[0.35em] uppercase text-white/30 font-medium">
                        System Status
                    </p>
                    <h2 className="text-xl font-light tracking-widest text-white/90 uppercase">
                        Pending Moderation
                    </h2>
                </div>
                <div className="text-[10px] tracking-[0.3em] font-medium text-white/40 uppercase">
                    {pending.length} entries awaiting
                </div>
            </header>

            {pending.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {pending.map((item) => (
                        <ContributionCard
                            key={item.id}
                            contribution={item}
                            onAction={handleAction}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-40 text-center space-y-4 bg-white/1 border border-dashed border-white/5">
                    <p className="text-[10px] tracking-[0.5em] uppercase text-white/20">
                        Terminal Clear
                    </p>
                    <p className="text-[8px] tracking-widest text-white/10 uppercase">
                        All contributions processed
                    </p>
                </div>
            )}
        </section>
    )
}
