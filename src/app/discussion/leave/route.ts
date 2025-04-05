import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

import { pusher } from '@/lib/pusher';

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const { name, discussionId } = await req.json();

    const discussion = await prisma.discussion.findUnique({
      where: { id: discussionId },
      select: { participants: true },
    });

    if (!discussion)
      return NextResponse.json(
        { error: 'Discussion Not Found' },
        { status: 404 }
      );

    const updatedParticipants = discussion.participants.filter(
      (p) => p !== name
    );

    await prisma.discussion.update({
      where: { id: discussionId },
      data: {
        participants: { set: updatedParticipants },
      },
    });

    // Trigger real-time event
    await pusher.trigger(discussionId, 'leave', name);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error leaving discussion:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
