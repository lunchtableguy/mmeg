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
    const tourDates = await prisma.tourDate.findMany({
      where: { artistId: id },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(tourDates);
  } catch (error) {
    console.error("Get tour dates error:", error);
    return NextResponse.json(
      { error: "Failed to get tour dates" },
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

    const tourDate = await prisma.tourDate.create({
      data: {
        artistId: id,
        venue: data.venue,
        city: data.city,
        state: data.state,
        country: data.country,
        date: new Date(data.date),
        ticketLink: data.ticketLink,
      },
    });

    return NextResponse.json(tourDate);
  } catch (error) {
    console.error("Create tour date error:", error);
    return NextResponse.json(
      { error: "Failed to create tour date" },
      { status: 500 }
    );
  }
}