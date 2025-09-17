import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// This is a one-time setup endpoint to create an initial admin user
// DELETE THIS FILE after creating your admin user for security!
export async function GET() {
  try {
    // Check if any admin users already exist
    const existingAdmin = await prisma.user.findFirst({
      where: {
        role: {
          in: ['OWNER', 'ADMIN']
        }
      }
    })

    if (existingAdmin) {
      return NextResponse.json({ 
        error: 'Admin user already exists. Delete this endpoint for security.' 
      }, { status: 400 })
    }

    // Create the initial admin user
    const hashedPassword = await bcrypt.hash('admin123!', 10)
    
    await prisma.user.create({
      data: {
        email: 'admin@mmeg.com',
        password: hashedPassword,
        role: 'OWNER'
      }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Admin user created successfully!',
      credentials: {
        email: 'admin@mmeg.com',
        password: 'admin123!',
        role: 'OWNER'
      },
      important: 'DELETE THE /api/setup ENDPOINT IMMEDIATELY FOR SECURITY!'
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ 
      error: 'Failed to create admin user' 
    }, { status: 500 })
  }
}