import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { UserRole } from "../../../../generated/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "users.edit")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const updateData: { email: string; role: UserRole; password?: string } = {
      email: data.email,
      role: data.role,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 12);
    }

    const user = await prisma.user.update({
      where: { id: id },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        artist: {
          select: {
            id: true,
            bandName: true,
          },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "users.delete")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (id === session.user.id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}