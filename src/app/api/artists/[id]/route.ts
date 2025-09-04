import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { canEditArtist } from "@/lib/permissions";
import { UserRole } from "../../../../generated/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const artist = await prisma.artist.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
        albums: {
          orderBy: {
            releaseDate: "desc",
          },
        },
        tourDates: {
          where: {
            date: {
              gte: new Date(),
            },
          },
          orderBy: {
            date: "asc",
          },
        },
        _count: {
          select: {
            subscribers: true,
          },
        },
      },
    });

    if (!artist) {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(artist);
  } catch (error) {
    console.error("Get artist error:", error);
    return NextResponse.json(
      { error: "Failed to get artist" },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const isOwnProfile = session.user.artistId === id;
    if (!canEditArtist(session.user.role as UserRole, isOwnProfile)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const data = await request.json();

    const artist = await prisma.artist.update({
      where: { id: id },
      data: {
        bandName: data.bandName,
        bio: data.bio,
        contactInfo: data.contactInfo,
        profileImage: data.profileImage,
        headerImage: data.headerImage,
        website: data.website,
        spotify: data.spotify,
        instagram: data.instagram,
        facebook: data.facebook,
        twitter: data.twitter,
        youtube: data.youtube,
        tiktok: data.tiktok,
      },
    });

    return NextResponse.json(artist);
  } catch (error) {
    console.error("Update artist error:", error);
    return NextResponse.json(
      { error: "Failed to update artist" },
      { status: 500 }
    );
  }
}