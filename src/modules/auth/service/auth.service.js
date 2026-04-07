import twilio from 'twilio';

const otpStore = new Map();

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const authService = {
  generateOTP: () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  sendOTP: async () => {
    const otp = authService.generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    const adminPhone = process.env.ADMIN_WHATSAPP;

    otpStore.set('admin_otp', { code: otp, expiresAt });

    console.log(`[AUTH] Generated OTP for admin: ${otp}`);

    try {
      if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN && adminPhone) {
        await client.messages.create({
          from: `whatsapp:+14155238886`, // Twilio Sandbox Number
          to: `whatsapp:${adminPhone}`,
          body: `Verification Code for TIM Admin: ${otp}`
        });
        return { success: true, message: "Code sent via WhatsApp" };
      } else {
        return { success: true, message: "Twilio not configured. Check console for code." };
      }
    } catch (error) {
      console.error("Twilio Error:", error);
      return { success: true, message: "Twilio Error. Check console for code." };
    }
  },

  verifyOTP: (code) => {
    const stored = otpStore.get('admin_otp');
    
    if (!stored) return { success: false, message: "No code found. Request a new one." };
    if (Date.now() > stored.expiresAt) {
      otpStore.delete('admin_otp');
      return { success: false, message: "Code expired." };
    }
    
    if (stored.code === code) {
      otpStore.delete('admin_otp');
      // Create a simple session token (in a real app, use JWT)
      const token = Buffer.from(`admin_${Date.now()}`).toString('base64');
      return { success: true, token };
    }

    return { success: false, message: "Invalid code." };
  }
};
