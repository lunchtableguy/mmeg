import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, password, role, bandName } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || "BAND",
        ...(role === "BAND" && bandName
          ? {
              artist: {
                create: {
                  bandName,
                },
              },
            }
          : {}),
      },
      include: {
        artist: true,
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        artistId: user.artist?.id,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}