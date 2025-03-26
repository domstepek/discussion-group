'use server';

// Packages
import { PrismaClient } from '@prisma/client';

// Utilities
import { generateDiscussionID } from '@/utils';

const prisma = new PrismaClient();

export async function createRecords(name: string) {
  const response = await prisma.$transaction([
    prisma.discussion.create({
      data: { id: generateDiscussionID() },
    }),
    prisma.user.create({
      data: { name },
    }),
  ]);

  return response;
}
