'use client'

import { useState } from 'react'
import axios from 'axios'

export default function OTPGate({ onVerify }) {
    const [step, setStep] = useState('send') // 'send' or 'verify'
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleSendOTP = async () => {
        setLoading(true)
        setError('')
        try {
            const { data } = await axios.post('/api/auth/send-otp')
            if (data.success) {
                setStep('verify')
                setMessage(data.message)
            } else {
                setError(data.message)
            }
        } catch (err) {
            setError('Error connecting to authentication service.')
        } finally {
            setLoading(false)
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const { data } = await axios.post('/api/auth/verify-otp', { code })
            if (data.success) {
                onVerify(data.token)
            } else {
                setError(data.message)
            }
        } catch (err) {
            setError('Verification failed. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-12 p-8 max-w-sm mx-auto">
            <header className="text-center space-y-4">
                <div className="w-12 h-px bg-white/20 mx-auto" />
                <h2 className="text-sm tracking-[0.4em] uppercase text-white font-light">
                    Terminal Access
                </h2>
                <p className="text-[10px] tracking-widest text-white/40 uppercase">
                    Verification required
                </p>
                <div className="w-12 h-px bg-white/20 mx-auto" />
            </header>

            {step === 'send' ? (
                <div className="space-y-8 w-full text-center">
                    <p className="text-[10px] text-white/60 tracking-wider leading-relaxed">
                        Authorize this terminal by sending a secure code to the registered administrator device.
                    </p>
                    <button
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="w-full py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-white text-[10px] tracking-[0.3em] uppercase font-medium transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Send Access Code'}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleVerify} className="space-y-8 w-full">
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="ACCESS CODE"
                            className="w-full bg-transparent border-b border-white/20 py-4 text-center text-white tracking-[0.5em] focus:outline-none focus:border-white transition-all placeholder:text-white/20"
                            maxLength={6}
                            required
                        />
                        {message && (
                            <p className="text-[8px] text-white/40 tracking-widest uppercase text-center">
                                {message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 border border-white/10 bg-white/10 hover:bg-white/20 text-white text-[10px] tracking-[0.3em] uppercase font-medium transition-all duration-300"
                        >
                            {loading ? 'Verifying...' : 'Authorize Terminal'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('send')}
                            className="text-[9px] text-white/30 tracking-widest uppercase hover:text-white transition-all"
                        >
                            Back to send
                        </button>
                    </div>
                </form>
            )}

            {error && (
                <p className="text-[9px] text-red-500/80 tracking-widest uppercase text-center">
                    {error}
                </p>
            )}
        </div>
    )
}
