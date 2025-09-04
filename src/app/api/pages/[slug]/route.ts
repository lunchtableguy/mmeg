import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { UserRole } from "../../../../generated/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const page = await prisma.page.findUnique({
      where: { slug: slug },
      include: {
        creator: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    const session = await getServerSession(authOptions);
    
    if (!page.published && (!session || !hasPermission(session.user.role as UserRole, "pages.edit"))) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Get page error:", error);
    return NextResponse.json(
      { error: "Failed to get page" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "pages.edit")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const page = await prisma.page.update({
      where: { slug: slug },
      data: {
        title: data.title,
        content: data.content,
        metaDescription: data.metaDescription,
        published: data.published,
      },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error("Update page error:", error);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "pages.delete")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await prisma.page.delete({
      where: { slug: slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete page error:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}