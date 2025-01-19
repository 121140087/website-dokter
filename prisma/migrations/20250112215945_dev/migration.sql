/*
  Warnings:

  - You are about to drop the column `antrianDateId` on the `Antrian` table. All the data in the column will be lost.
  - Added the required column `jadwalId` to the `Antrian` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Antrian" DROP CONSTRAINT "Antrian_antrianDateId_fkey";

-- AlterTable
ALTER TABLE "Antrian" DROP COLUMN "antrianDateId",
ADD COLUMN     "jadwalId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Antrian" ADD CONSTRAINT "Antrian_jadwalId_fkey" FOREIGN KEY ("jadwalId") REFERENCES "Jadwal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
