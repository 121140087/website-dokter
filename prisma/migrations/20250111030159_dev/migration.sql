/*
  Warnings:

  - The values [user,dokter,assistent] on the enum `ChatRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChatRole_new" AS ENUM ('USER', 'DOKTER', 'ASSISTENT');
ALTER TABLE "ChatRoom" ALTER COLUMN "lastChatRole" TYPE "ChatRole_new" USING ("lastChatRole"::text::"ChatRole_new");
ALTER TABLE "Chat" ALTER COLUMN "role" TYPE "ChatRole_new" USING ("role"::text::"ChatRole_new");
ALTER TYPE "ChatRole" RENAME TO "ChatRole_old";
ALTER TYPE "ChatRole_new" RENAME TO "ChatRole";
DROP TYPE "ChatRole_old";
COMMIT;
