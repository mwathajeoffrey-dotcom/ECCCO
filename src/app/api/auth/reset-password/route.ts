import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const { token, password } = resetPasswordSchema.parse(body);
    
    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(), // Token must not be expired
        },
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Update user with new password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });
    
    return NextResponse.json(
      { message: 'Password has been reset successfully' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Reset password error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { message: 'Reset token is required', valid: false },
        { status: 400 }
      );
    }
    
    // Check if token is valid and not expired
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        email: true,
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token', valid: false },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        message: 'Token is valid',
        valid: true,
        email: user.email 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Token validation error:', error);
    
    return NextResponse.json(
      { message: 'Internal server error', valid: false },
      { status: 500 }
    );
  }
}