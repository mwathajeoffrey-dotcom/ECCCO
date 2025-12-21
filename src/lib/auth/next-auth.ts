import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/database/prisma-client';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // For database sessions (OAuth with adapter)
      if (user) {
        session.user.id = user.id;
        session.user.role = (user as any).role || 'student';
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Session callback:', { 
          hasUser: !!user, 
          sessionUserId: session.user?.id,
        });
      }
      
      return session;
    },
    async signIn({ account, profile, user }) {
      // For development with dummy Google credentials, skip OAuth
      if (process.env.NODE_ENV === 'development' && 
          account?.provider === 'google' &&
          process.env.GOOGLE_CLIENT_ID === 'dummy-client-id') {
        return false; // Disable Google OAuth in dev with dummy credentials
      }
      
      // Allow all sign-ins (Google OAuth)
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database', // Use database sessions for OAuth with PrismaAdapter
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};