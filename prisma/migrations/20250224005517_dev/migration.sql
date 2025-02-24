/*
  Warnings:

  - You are about to drop the column `jumlahAntrianMaksimal` on the `Jadwal` table. All the data in the column will be lost.
  - Added the required column `jam` to the `Antrian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Antrian" ADD COLUMN     "jam" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Jadwal" DROP COLUMN "jumlahAntrianMaksimal";

-- AlterTable
ALTER TABLE "JamBuka" ADD COLUMN     "jumlahAntrian" INTEGER NOT NULL DEFAULT 0;
