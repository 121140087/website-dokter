/*
  Warnings:

  - You are about to drop the column `userId` on the `Antrian` table. All the data in the column will be lost.
  - Added the required column `pasienNIK` to the `Antrian` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Antrian" DROP CONSTRAINT "Antrian_userId_fkey";

-- AlterTable
ALTER TABLE "Antrian" DROP COLUMN "userId",
ADD COLUMN     "pasienNIK" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Antrian" ADD CONSTRAINT "Antrian_pasienNIK_fkey" FOREIGN KEY ("pasienNIK") REFERENCES "Pasien"("nik") ON DELETE CASCADE ON UPDATE CASCADE;
