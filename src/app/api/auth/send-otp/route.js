import { NextResponse } from 'next/server';
import { authService } from '@/modules/auth/auth.service';

export async function POST() {
    try {
        const result = await authService.sendOTP();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
