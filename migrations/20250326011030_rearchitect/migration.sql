/*
  Warnings:

  - You are about to drop the column `discussionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `MessageQueue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MessageQueue" DROP CONSTRAINT "MessageQueue_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_discussionId_fkey";

-- DropIndex
DROP INDEX "User_sessionToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "discussionId",
DROP COLUMN "sessionToken",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "MessageQueue";

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "message" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "discussionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "Discussion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
