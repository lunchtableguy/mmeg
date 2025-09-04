import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { UserRole } from "../../../../generated/prisma";

export async function GET() {
  try {
    const categories = await prisma.forumCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Get forum categories error:", error);
    return NextResponse.json(
      { error: "Failed to get categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "forum.moderate")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const category = await prisma.forumCategory.create({
      data: {
        name: data.name,
        description: data.description,
        order: data.order || 0,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Create forum category error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}