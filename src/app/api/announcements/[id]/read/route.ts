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

    if (!session || !session.user.artistId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const recipient = await prisma.announcementRecipient.update({
      where: {
        announcementId_artistId: {
          announcementId: id,
          artistId: session.user.artistId,
        },
      },
      data: {
        read: true,
        readAt: new Date(),
      },
    });

    return NextResponse.json(recipient);
  } catch (error) {
    console.error("Mark announcement read error:", error);
    return NextResponse.json(
      { error: "Failed to mark announcement as read" },
      { status: 500 }
    );
  }
}