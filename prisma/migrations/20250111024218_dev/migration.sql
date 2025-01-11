/*
  Warnings:

  - You are about to drop the column `roomId` on the `Chat` table. All the data in the column will be lost.
  - The primary key for the `ChatRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ChatRoom` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_roomId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "roomId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ChatRoom"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
