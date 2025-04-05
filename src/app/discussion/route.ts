import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import { pusher } from '@/lib/pusher';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest) {
  try {
    const { name, discussionId } = await req.json();

    if (!name || !discussionId)
      return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });

    const discussion = await prisma.discussion.findUnique({
      where: { id: discussionId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });

    if (!discussion)
      return NextResponse.json(
        { error: 'Discussion Not Found' },
        { status: 404 }
      );

    const mostRecentMessage = discussion.messages?.[0]?.message as {
      type: string;
      content: string;
    };

    if (mostRecentMessage?.content === name)
      return NextResponse.json(
        { error: 'Cannot Request Twice' },
        { status: 400 }
      );

    const message = await prisma.message.create({
      data: {
        message: { type: 'request', content: name },
        discussion: { connect: { id: discussionId } },
      },
    });

    // Trigger real-time event
    await pusher.trigger(discussionId, 'request', name);

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!req.url)
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });

    const searchParams = new URL(req.url).searchParams;
    const discussionId = searchParams.get('discussionId');
    const name = searchParams.get('name');

    if (!discussionId || !name)
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });

    const discussionCheck = await prisma.discussion.findUnique({
      where: { id: discussionId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });

    if (!discussionCheck)
      return NextResponse.json(
        { error: 'Discussion Not Found' },
        { status: 404 }
      );

    if (!discussionCheck.participants.includes(name)) {
      const discussion = await prisma.discussion.update({
        where: { id: discussionId },
        data: { participants: { push: name } },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      });
      await pusher.trigger(discussionId, 'join', name);

      return NextResponse.json(discussion, { status: 200 });
    } else {
      return NextResponse.json(discussionCheck, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
