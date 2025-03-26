'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const validateRoomID = async (roomID: string) => {
  const response = await prisma.discussion.findUnique({
    where: { id: roomID },
  });

  return !!response?.id;
};
