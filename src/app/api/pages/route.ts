import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { UserRole } from "../../../generated/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const published = searchParams.get("published");

    const where = published !== null 
      ? { published: published === "true" }
      : {};

    const pages = await prisma.page.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        creator: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Get pages error:", error);
    return NextResponse.json(
      { error: "Failed to get pages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "pages.create")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const page = await prisma.page.create({
      data: {
        slug: data.slug,
        title: data.title,
        content: data.content,
        metaDescription: data.metaDescription,
        published: data.published || false,
        createdBy: session.user.id,
      },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error("Create page error:", error);
    return NextResponse.json(
      { error: "Failed to create page" },
      { status: 500 }
    );
  }
}