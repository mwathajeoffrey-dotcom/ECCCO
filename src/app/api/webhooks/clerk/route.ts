import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      logger.error('Missing Svix headers');
      return new NextResponse('Error occurred -- no svix headers', {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Get the Svix secret from environment
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      logger.error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
      return new NextResponse('Error occurred -- webhook secret missing', {
        status: 500,
      });
    }

    // Create a new Svix instance with your secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: any;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as any;
    } catch (err: any) {
      logger.error('Error verifying webhook:', err.message);
      return new NextResponse('Error occurred', { status: 400 });
    }

    // Get the event type
    const eventType = evt.type;
    const { id, email_addresses, first_name, last_name } = evt.data;

    logger.info(`Clerk webhook received: ${eventType} for user ${id}`);

    // Handle the event
    if (eventType === 'user.created') {
      try {
        // Create user in database
        const email = email_addresses?.[0]?.email_address || '';
        const name = `${first_name || ''} ${last_name || ''}`.trim() || 'User';

        const user = await prisma.user.create({
          data: {
            id,
            email,
            name,
          },
        });

        logger.info(`User created in database: ${user.id} (${user.email})`);

        return NextResponse.json({
          success: true,
          message: 'User created',
          userId: user.id,
        });
      } catch (error: any) {
        // If user already exists, that's okay
        if (error.code === 'P2002') {
          logger.info(`User ${id} already exists in database`);
          return NextResponse.json({
            success: true,
            message: 'User already exists',
          });
        }

        logger.error('Error creating user in database:', error);
        return new NextResponse('Error creating user', { status: 500 });
      }
    }

    if (eventType === 'user.updated') {
      try {
        // Update user in database
        const email = email_addresses?.[0]?.email_address || '';
        const name = `${first_name || ''} ${last_name || ''}`.trim() || 'User';

        const user = await prisma.user.update({
          where: { id },
          data: {
            email,
            name,
          },
        });

        logger.info(`User updated in database: ${user.id} (${user.email})`);

        return NextResponse.json({
          success: true,
          message: 'User updated',
          userId: user.id,
        });
      } catch (error: any) {
        logger.error('Error updating user in database:', error);
        // If user doesn't exist, create them
        if (error.code === 'P2025') {
          try {
            const email = email_addresses?.[0]?.email_address || '';
            const name = `${first_name || ''} ${last_name || ''}`.trim() || 'User';

            const user = await prisma.user.create({
              data: {
                id,
                email,
                name,
              },
            });

            logger.info(`User created in database (from update): ${user.id}`);

            return NextResponse.json({
              success: true,
              message: 'User created',
              userId: user.id,
            });
          } catch (createError: any) {
            logger.error('Error creating user from update:', createError);
            return new NextResponse('Error creating user', { status: 500 });
          }
        }

        return new NextResponse('Error updating user', { status: 500 });
      }
    }

    if (eventType === 'user.deleted') {
      try {
        // Soft delete or mark user as deleted
        // You can also hard delete if you prefer
        await prisma.user.update({
          where: { id },
          data: {
            // Add a deletedAt field if you want soft deletes
            // For now, we'll just log it
          },
        });

        logger.info(`User deletion event received: ${id}`);

        return NextResponse.json({
          success: true,
          message: 'User deletion processed',
        });
      } catch (error: any) {
        logger.error('Error processing user deletion:', error);
        return new NextResponse('Error processing deletion', { status: 500 });
      }
    }

    // Return success for other events
    return NextResponse.json({
      success: true,
      message: 'Webhook received',
      eventType,
    });
  } catch (error: any) {
    logger.error('Webhook error:', error);
    return new NextResponse('Webhook error', { status: 500 });
  }
}
