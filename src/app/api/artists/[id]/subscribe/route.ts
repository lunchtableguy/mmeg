import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const existingSubscription = await prisma.subscription.findUnique({
      where: {
        userId_artistId: {
          userId: session.user.id,
          artistId: id,
        },
      },
    });

    if (existingSubscription) {
      return NextResponse.json(
        { error: "Already subscribed" },
        { status: 400 }
      );
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        artistId: id,
      },
    });

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.subscription.delete({
      where: {
        userId_artistId: {
          userId: session.user.id,
          artistId: id,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}