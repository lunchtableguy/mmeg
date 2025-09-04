import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { UserRole, DocumentType } from "../../../generated/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!session.user.artistId) {
      return NextResponse.json(
        { error: "Not an artist" },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");

    const where: { artistId: string; type?: DocumentType } = {
      artistId: session.user.artistId,
    };
    
    if (type) {
      where.type = type as DocumentType;
    }

    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Get documents error:", error);
    return NextResponse.json(
      { error: "Failed to get documents" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !hasPermission(session.user.role as UserRole, "documents.upload")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const document = await prisma.document.create({
      data: {
        artistId: data.artistId,
        title: data.title,
        type: data.type,
        fileUrl: data.fileUrl,
        fileSize: data.fileSize,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("Create document error:", error);
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}