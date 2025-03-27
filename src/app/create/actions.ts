'use server';

// Packages
import { PrismaClient } from '@prisma/client';

// Utilities
import { generateDiscussionID } from '@/utils';

const prisma = new PrismaClient();

export async function createRecords(time: number) {
  const response = await prisma.discussion.create({
    data: { id: generateDiscussionID(), maxTime: time },
  });

  return response;
}
