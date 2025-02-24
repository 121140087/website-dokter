/*
  Warnings:

  - Changed the type of `key` on the `JamBuka` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "JamBuka" DROP COLUMN "key",
ADD COLUMN     "key" INTEGER NOT NULL;
