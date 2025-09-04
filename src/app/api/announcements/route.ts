import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { UserRole } from "../../../generated/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (hasPermission(session.user.role as UserRole, "announcements.create")) {
      const announcements = await prisma.announcement.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { recipients: true },
          },
        },
      });
      return NextResponse.json(announcements);
    }

    if (!session.user.artistId) {
      return NextResponse.json([], { status: 200 });
    }

    const announcements = await prisma.announcement.findMany({
      where: {
        OR: [
          { expiresAt: null },
          { expiresAt: { gte: new Date() } },
        ],
        recipients: {
          some: {
            artistId: session.user.artistId,
          },
        },
      },
      orderBy: [
        { priority: "desc" },
        { createdAt: "desc" },
      ],
      include: {
        recipients: {
          where: {
            artistId: session.user.artistId,
          },
        },
      },
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Get announcements error:", error);
    return NextResponse.json(
      { error: "Failed to get announcements" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "announcements.create")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        content: data.content,
        priority: data.priority || "NORMAL",
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      },
    });

    if (data.artistIds && data.artistIds.length > 0) {
      await prisma.announcementRecipient.createMany({
        data: data.artistIds.map((artistId: string) => ({
          announcementId: announcement.id,
          artistId,
        })),
      });
    }

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("Create announcement error:", error);
    return NextResponse.json(
      { error: "Failed to create announcement" },
      { status: 500 }
    );
  }
}