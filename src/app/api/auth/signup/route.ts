import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const { email, password } = signUpSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Generate a unique sessionId for the user
    const sessionId = `user-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        sessionId,
        name: body.name || email.split('@')[0], // Use provided name or part before @ as default
        role: 'student', // Default role
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(
      { 
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    // Detailed error logging for debugging
    console.error('=== SIGNUP ERROR START ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('Full error:', JSON.stringify(error, null, 2));
    console.error('=== SIGNUP ERROR END ===');
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    
    // Check for specific Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: any };
      
      // P2002: Unique constraint violation
      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          { message: 'An account with this email already exists' },
          { status: 400 }
        );
      }
      
      // P2003: Foreign key constraint failed
      if (prismaError.code === 'P2003') {
        return NextResponse.json(
          { message: 'Database constraint error' },
          { status: 500 }
        );
      }
    }
    
    // In development, return detailed error
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        { 
          message: 'Signup failed',
          error: error instanceof Error ? error.message : 'Unknown error',
          details: error
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error. Please check the logs or try again later.' },
      { status: 500 }
    );
  }
}