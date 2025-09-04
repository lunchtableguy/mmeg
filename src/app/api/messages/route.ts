import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "inbox";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where = {
      ...(type === "inbox"
        ? { recipientId: session.user.id }
        : { senderId: session.user.id }),
    };

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
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
      }),
      prisma.message.count({ where }),
    ]);

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { error: "Failed to get messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const message = await prisma.message.create({
      data: {
        senderId: session.user.id,
        recipientId: data.recipientId,
        subject: data.subject,
        content: data.content,
      },
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

    return NextResponse.json(message);
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}