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
    const replies = await prisma.forumReply.findMany({
      where: { postId: id },
      orderBy: { createdAt: "asc" },
      include: {
        author: {
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

    return NextResponse.json(replies);
  } catch (error) {
    console.error("Get forum replies error:", error);
    return NextResponse.json(
      { error: "Failed to get replies" },
      { status: 500 }
    );
  }
}

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

    const data = await request.json();

    const reply = await prisma.forumReply.create({
      data: {
        postId: id,
        authorId: session.user.id,
        content: data.content,
      },
      include: {
        author: {
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

    return NextResponse.json(reply);
  } catch (error) {
    console.error("Create forum reply error:", error);
    return NextResponse.json(
      { error: "Failed to create reply" },
      { status: 500 }
    );
  }
}