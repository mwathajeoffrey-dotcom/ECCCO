import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';
import { z } from 'zod';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const { email } = forgotPasswordSchema.parse(body);
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    
    if (!user) {
      // Don't reveal if user exists - return success for security
      return NextResponse.json(
        { message: 'If an account with that email exists, we have sent a password reset link.' },
        { status: 200 }
      );
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
    
    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetTokenExpiry,
      },
    });
    
    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;
    
    // Email configuration (for development, we'll just log it)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔗 Password Reset Link (Development Mode):');
      console.log(`   Email: ${email}`);
      console.log(`   Reset URL: ${resetUrl}`);
      console.log(`   Token expires: ${resetTokenExpiry.toLocaleString()}`);
    } else {
      // In production, you would send actual email here
      // This is where you'd integrate with SendGrid, SES, or another email service
      try {
        // Example with nodemailer (configure with your email provider)
        const transporter = nodemailer.createTransport({
          // Configure your email service here
          service: 'gmail', // or your preferred service
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_FROM || 'noreply@eccco.app',
          to: email,
          subject: 'ECCCO - Password Reset Request',
          html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
              <h2 style="color: #3B82F6;">Password Reset Request</h2>
              <p>You requested a password reset for your ECCCO account.</p>
              <p>Click the button below to reset your password:</p>
              <a href="${resetUrl}" style="display: inline-block; background-color: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
                Reset Password
              </a>
              <p>Or copy and paste this link into your browser:</p>
              <p style="background-color: #f3f4f6; padding: 10px; border-radius: 4px; word-break: break-all;">
                ${resetUrl}
              </p>
              <p style="color: #666; font-size: 14px;">
                This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
              </p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="color: #666; font-size: 12px;">
                ECCCO - Emergency & Critical Care Comprehensive Online<br>
                Medical Training Platform
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails - token is still saved
      }
    }
    
    return NextResponse.json(
      { message: 'If an account with that email exists, we have sent a password reset link.' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Forgot password error:', error);
    
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