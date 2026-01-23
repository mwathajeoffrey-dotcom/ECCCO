import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all notes for the current user
export async function GET() {
  try {
    const { userId } = await auth();

    // Development mode: Use a default test user if not authenticated
    const isDevelopment = process.env.NODE_ENV === 'development';
    let effectiveUserId: string | null = userId;

    if (!userId && isDevelopment) {
      console.warn('[DEV MODE] Using test user for unauthenticated GET request');
      effectiveUserId = 'dev_test_user';
    } else if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    let user = await prisma.user.findUnique({
      where: { clerkUserId: effectiveUserId! },
    });

    // Create test user in development if doesn't exist
    if (!user && isDevelopment) {
      console.warn('[DEV MODE] Creating test user for GET request');
      user = await prisma.user.create({
        data: {
          id: 'dev_user_id',
          clerkUserId: 'dev_test_user',
          email: 'test@localhost.dev',
          updatedAt: new Date(),
        },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all notes for the user, sorted by most recent
    const notes = await prisma.userNote.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

// POST - Create a new note
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    // Development mode: Use a default test user if not authenticated
    const isDevelopment = process.env.NODE_ENV === 'development';
    let effectiveUserId: string | null = userId;

    if (!userId && isDevelopment) {
      console.warn('[DEV MODE] Using test user for unauthenticated request');
      effectiveUserId = 'dev_test_user';
    } else if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    let user = await prisma.user.findUnique({
      where: { clerkUserId: effectiveUserId! },
    });

    // Create test user in development if doesn't exist
    if (!user && isDevelopment) {
      console.warn('[DEV MODE] Creating test user in database');
      user = await prisma.user.create({
        data: {
          id: 'dev_user_id',
          clerkUserId: 'dev_test_user',
          email: 'test@localhost.dev',
          updatedAt: new Date(),
        },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { 
      title, 
      content, 
      questionId, 
      questionText, 
      category, 
      tags,
      // NEW: Clinical evidence search fields
      searchQuery,
      evidenceSummary,
      specialty,
      patientContext,
    } = body;

    // Validate required fields
    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Create new note
    const note = await prisma.userNote.create({
      data: {
        userId: user.id,
        title,
        content,
        // Quiz/question fields (legacy support)
        questionId,
        questionText,
        category,
        tags: tags || [],
        // Clinical evidence search fields (NEW) - all optional
        ...(searchQuery && { searchQuery }),
        ...(evidenceSummary && { evidenceSummary }),
        ...(specialty && { specialty }),
        ...(patientContext && { patientContext }),
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    
    // Better error logging for debugging
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }
    
    return NextResponse.json(
      { 
        error: "Failed to create note",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// PATCH - Update an existing note
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();

    // Development mode: Use a default test user if not authenticated
    const isDevelopment = process.env.NODE_ENV === 'development';
    let effectiveUserId: string | null = userId;

    if (!userId && isDevelopment) {
      console.warn('[DEV MODE] Using test user for PATCH request');
      effectiveUserId = 'dev_test_user';
    } else if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkUserId: effectiveUserId! },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { 
      id,
      title, 
      content, 
      tags,
      searchQuery,
      evidenceSummary,
      specialty,
      patientContext,
    } = body;

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    // Verify the note belongs to the user
    const existingNote = await prisma.userNote.findFirst({
      where: { 
        id,
        userId: user.id,
      },
    });

    if (!existingNote) {
      return NextResponse.json(
        { error: "Note not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update the note
    const note = await prisma.userNote.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(tags !== undefined && { tags }),
        ...(searchQuery !== undefined && { searchQuery }),
        ...(evidenceSummary !== undefined && { evidenceSummary }),
        ...(specialty !== undefined && { specialty }),
        ...(patientContext !== undefined && { patientContext }),
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a note
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    // Development mode: Use a default test user if not authenticated
    const isDevelopment = process.env.NODE_ENV === 'development';
    let effectiveUserId: string | null = userId;

    if (!userId && isDevelopment) {
      console.warn('[DEV MODE] Using test user for DELETE request');
      effectiveUserId = 'dev_test_user';
    } else if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkUserId: effectiveUserId! },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    // Verify the note belongs to the user before deleting
    const existingNote = await prisma.userNote.findFirst({
      where: { 
        id,
        userId: user.id,
      },
    });

    if (!existingNote) {
      return NextResponse.json(
        { error: "Note not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the note
    await prisma.userNote.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
