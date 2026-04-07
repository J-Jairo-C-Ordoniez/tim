'use client'

import { useState, useEffect } from 'react'
import OTPGate from '@/components/admin/main/sections/OTPGate'
import ModerationPanel from '@/components/admin/main/sections/ModerationPanel'

export default function Main() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = sessionStorage.getItem('admin_token')
        if (storedToken) {
            setToken(storedToken)
            setIsAuthenticated(true)
        }
    }, [])

    const handleVerify = (newToken) => {
        sessionStorage.setItem('admin_token', newToken)
        setToken(newToken)
        setIsAuthenticated(true)
    }

    return (
        <main className="w-full h-[calc(100vh-64px)] bg-background font-inter box-border overflow-hidden flex flex-col">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-center h-full">
                {!isAuthenticated
                    ? <OTPGate onVerify={handleVerify} />
                    : <ModerationPanel token={token} />
                }
            </div>
        </main>
    )
}
