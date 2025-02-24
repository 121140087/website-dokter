/*
  Warnings:

  - You are about to drop the column `tanggalSelesai` on the `Jadwal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jadwal" DROP COLUMN "tanggalSelesai";

-- AlterTable
ALTER TABLE "JamBuka" ALTER COLUMN "jumlahAntrian" SET DEFAULT 12;
