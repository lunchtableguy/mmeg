import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

// This is a temporary endpoint to create a test user without database
// For demonstration purposes only - DELETE THIS IN PRODUCTION!
export async function GET() {
  // In production, you would need a real database
  // For now, this shows what the admin credentials would be
  
  const testCredentials = {
    email: 'admin@mmeg.com',
    password: 'admin123!',
    hashedPassword: await bcrypt.hash('admin123!', 10),
    role: 'OWNER'
  }
  
  return NextResponse.json({
    message: 'Test credentials (database not connected in production)',
    credentials: {
      email: testCredentials.email,
      password: testCredentials.password,
      role: testCredentials.role
    },
    note: 'To use admin features in production, you need to:',
    steps: [
      '1. Set up a PostgreSQL database (e.g., Supabase, Railway, or Neon)',
      '2. Add DATABASE_URL to Vercel environment variables',
      '3. Run prisma migrate deploy to create tables',
      '4. Visit /api/setup to create the admin user'
    ]
  })
}