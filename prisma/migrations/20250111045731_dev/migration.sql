/*
  Warnings:

  - The values [USER,DOKTER,ASSISTENT] on the enum `ChatRole` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `ChatRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `ChatRoom` table. All the data in the column will be lost.
  - Added the required column `id` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChatRole_new" AS ENUM ('user', 'dokter', 'assistant');
ALTER TABLE "ChatRoom" ALTER COLUMN "lastChatRole" TYPE "ChatRole_new" USING ("lastChatRole"::text::"ChatRole_new");
ALTER TABLE "Chat" ALTER COLUMN "role" TYPE "ChatRole_new" USING ("role"::text::"ChatRole_new");
ALTER TYPE "ChatRole" RENAME TO "ChatRole_old";
ALTER TYPE "ChatRole_new" RENAME TO "ChatRole";
DROP TYPE "ChatRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- AlterTable
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
