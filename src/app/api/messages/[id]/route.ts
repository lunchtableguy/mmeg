import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(
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

    const message = await prisma.message.findUnique({
      where: { id: id },
      include: {
        sender: {
          select: {
            id: true,
            email: true,
            artist: {
              select: {
                bandName: true,
                profileImage: true,
              },
            },
          },
        },
        recipient: {
          select: {
            id: true,
            email: true,
            artist: {
              select: {
                bandName: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });

    if (!message) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    if (
      message.senderId !== session.user.id &&
      message.recipientId !== session.user.id
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    if (message.recipientId === session.user.id && !message.read) {
      await prisma.message.update({
        where: { id: id },
        data: { read: true },
      });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("Get message error:", error);
    return NextResponse.json(
      { error: "Failed to get message" },
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

    const message = await prisma.message.findUnique({
      where: { id: id },
    });

    if (!message) {
      return NextResponse.json(
        { error: "Message not found" },
        { status: 404 }
      );
    }

    if (
      message.senderId !== session.user.id &&
      message.recipientId !== session.user.id
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await prisma.message.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete message error:", error);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}