'use client'

import { useState } from 'react'
import axios from 'axios'

export default function OTPGate({ onVerify }) {
    const [step, setStep] = useState('send')
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
        <section className="flex flex-col items-center justify-center gap-12 p-8 max-w-lg mx-auto">
            <header className="text-center space-y-4">
                <div className="w-12 h-px bg-primary/20 mx-auto" />
                <h2 className="text-md tracking-widest uppercase text-primary font-light">
                    Terminal Access
                </h2>
                <p className="text-xs tracking-widest text-primary/40 uppercase">
                    Verification required
                </p>
                <div className="w-12 h-px bg-primary/20 mx-auto" />
            </header>

            {step === 'send' ? (
                <div className="space-y-8 w-full text-center">
                    <p className="text-sm text-secondary/80 tracking-wider leading-relaxed">
                        Authorize this terminal by sending a secure code to the registered administrator device.
                    </p>
                    <button
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="cursor-pointer w-fit mx-auto px-6 py-4 border border-primary/10 bg-primary/5 hover:bg-primary/10 text-primary text-xs tracking-widest uppercase font-medium transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : 'Send Access Code'}
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleVerify}
                    className="space-y-8 w-full"
                >
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="******"
                            className="w-full bg-transparent border-b border-primary/20 py-4 text-center text-primary tracking-widest focus:outline-none focus:border-primary transition-all placeholder:text-primary/20"
                            maxLength={6}
                            required
                        />
                        {message && (
                            <p className="text-xs text-primary/40 tracking-widest uppercase text-center">
                                {message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-fit cursor-pointer mx-auto px-6 py-4 border border-primary/10 bg-primary/10 hover:bg-primary/20 text-primary text-xs tracking-widest uppercase font-medium transition-all duration-300"
                        >
                            {loading ? 'Verifying...' : 'Authorize Terminal'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('send')}
                            className="cursor-pointer text-xs text-primary/40 tracking-widest uppercase hover:text-primary transition-all"
                        >
                            Back to send
                        </button>
                    </div>
                </form>
            )}

            {error && (
                <p className="text-xs text-red-500/80 tracking-widest uppercase text-center">
                    {error}
                </p>
            )}
        </section>
    )
}
