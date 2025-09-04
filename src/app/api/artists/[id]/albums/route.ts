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
    const albums = await prisma.album.findMany({
      where: { artistId: id },
      orderBy: { releaseDate: "desc" },
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error("Get albums error:", error);
    return NextResponse.json(
      { error: "Failed to get albums" },
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

    if (session.user.artistId !== id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const data = await request.json();

    const album = await prisma.album.create({
      data: {
        artistId: id,
        title: data.title,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
        coverImage: data.coverImage,
        streamingLinks: data.streamingLinks,
      },
    });

    return NextResponse.json(album);
  } catch (error) {
    console.error("Create album error:", error);
    return NextResponse.json(
      { error: "Failed to create album" },
      { status: 500 }
    );
  }
}