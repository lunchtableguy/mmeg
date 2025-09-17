import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: "TEMPORARY ADMIN CREDENTIALS",
    credentials: {
      email: "admin@mmeg.com",
      password: "admin123!",
      role: "OWNER (full access)"
    },
    loginUrl: "https://mmeg.vercel.app/artists/sign-in",
    adminUrl: "https://mmeg.vercel.app/admin",
    note: "These credentials are hardcoded in the auth system temporarily. To disable them, remove the override in src/lib/auth.ts"
  })
}