import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where = categoryId ? { categoryId } : {};

    const [posts, total] = await Promise.all([
      prisma.forumPost.findMany({
        where,
        orderBy: [
          { pinned: "desc" },
          { createdAt: "desc" },
        ],
        skip,
        take: limit,
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
          category: true,
          _count: {
            select: { replies: true },
          },
        },
      }),
      prisma.forumPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get forum posts error:", error);
    return NextResponse.json(
      { error: "Failed to get posts" },
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

    const post = await prisma.forumPost.create({
      data: {
        categoryId: data.categoryId,
        authorId: session.user.id,
        title: data.title,
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
        category: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Create forum post error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}