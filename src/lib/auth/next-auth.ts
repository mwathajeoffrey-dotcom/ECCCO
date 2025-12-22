import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/database/prisma-client';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
  // Only use adapter for OAuth providers, not credentials
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret',
    }),
    // Credentials provider for email/password authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text", placeholder: "Your Name" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        try {
          const bcrypt = require('bcryptjs');
          
          // Find user
          let user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() }
          });

          // For development mode without password - allow test accounts
          if (process.env.NODE_ENV === 'development' && !credentials.password) {
            if (!user) {
              // Create test user
              const sessionId = `user-${Date.now()}-${Math.random().toString(36).substring(7)}`;
              user = await prisma.user.create({
                data: {
                  email: credentials.email.toLowerCase(),
                  name: credentials.name || credentials.email.split('@')[0],
                  emailVerified: new Date(),
                  sessionId,
                }
              });
            }
            return {
              id: user.id,
              email: user.email!,
              name: user.name,
              image: user.image,
            };
          }

          // Password-based authentication
          if (credentials.password) {
            if (!user || !user.password) {
              return null; // User not found or no password set
            }

            // Verify password
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) {
              return null;
            }

            return {
              id: user.id,
              email: user.email!,
              name: user.name,
              image: user.image,
              role: user.role,
            };
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // For database sessions (OAuth)
      if (user) {
        session.user.id = user.id;
        session.user.role = user.role || 'student';
      }
      // For JWT sessions (credentials)
      else if (token?.sub) {
        session.user.id = token.sub;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = (token.role as string) || 'student';
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Session callback:', { 
          hasUser: !!user, 
          hasToken: !!token?.sub, 
          sessionUserId: session.user?.id,
          tokenSub: token?.sub 
        });
      }
      
      return session;
    },
    async jwt({ token, user, account }) {
      // For credentials provider, store user info in token
      if (account?.provider === 'credentials' && user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || 'student';
        
        if (process.env.NODE_ENV === 'development') {
          console.log('JWT callback - credentials:', { 
            userId: user.id, 
            email: user.email 
          });
        }
      }
      return token;
    },
    async signIn({ account, profile, user }) {
      // For development with dummy Google credentials, skip OAuth
      if (process.env.NODE_ENV === 'development' && 
          account?.provider === 'google' &&
          process.env.GOOGLE_CLIENT_ID === 'dummy-client-id') {
        return false; // Disable Google OAuth in dev with dummy credentials
      }
      
      // Allow credentials provider
      if (account?.provider === 'credentials') {
        return true;
      }
      
      // For production Google OAuth, require proper config
      return !!(account && profile);
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt', // Use JWT for credentials provider compatibility
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};