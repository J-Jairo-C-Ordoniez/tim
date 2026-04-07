'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'
import OTPGate from '@/components/admin/sections/OTPGate'
import ModerationPanel from '@/components/admin/sections/ModerationPanel'

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState(null)

    // Check session storage on mount
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
        <AdminLayout>
            {!isAuthenticated ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <OTPGate onVerify={handleVerify} />
                </div>
            ) : (
                <ModerationPanel token={token} />
            )}
        </AdminLayout>
    )
}
