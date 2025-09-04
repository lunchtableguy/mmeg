import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { tier, paymentMethod, ...paymentDetails } = data

    // Check if user already has an active membership
    const existingMembership = await prisma.membership.findFirst({
      where: {
        userId: session.user.id,
        active: true
      }
    })

    if (existingMembership) {
      // Update existing membership
      const updated = await prisma.membership.update({
        where: { id: existingMembership.id },
        data: {
          tier,
          updatedAt: new Date()
        }
      })
      
      return NextResponse.json({ 
        membership: updated,
        message: 'Membership tier updated successfully' 
      })
    }

    // Create new membership
    const membership = await prisma.membership.create({
      data: {
        userId: session.user.id,
        tier,
        active: true,
        // In production, add Stripe customer/subscription IDs here
      }
    })

    // Send welcome email (in production)
    // await sendWelcomeEmail(session.user.email, tier)

    return NextResponse.json({ 
      membership,
      message: 'Successfully joined the fan club!' 
    })
  } catch (error) {
    console.error('Fan club join error:', error)
    return NextResponse.json(
      { error: 'Failed to process membership' },
      { status: 500 }
    )
  }
}