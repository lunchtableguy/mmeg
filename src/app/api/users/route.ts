import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { UserRole } from "../../../generated/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "users.edit")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get("role");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: { role?: UserRole } = {};
    
    if (role) {
      where.role = role as UserRole;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          artist: {
            select: {
              id: true,
              bandName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { error: "Failed to get users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "users.create")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
        ...(data.role === "BAND" && data.bandName
          ? {
              artist: {
                create: {
                  bandName: data.bandName,
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
      id: user.id,
      email: user.email,
      role: user.role,
      artist: user.artist,
    });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}