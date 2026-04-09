import { NextResponse } from 'next/server';
import { authService } from '@/modules/auth/auth.service';

export async function POST(req) {
    try {
        const { code } = await req.json();
        const result = authService.verifyOTP(code);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
