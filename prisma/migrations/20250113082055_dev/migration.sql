/*
  Warnings:

  - Added the required column `nama` to the `Antrian` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusAntrian" AS ENUM ('MENUNGGU', 'TIDAK_HADIR', 'BATAL', 'SEDANG_DIPERIKSA', 'SELESAI_DIPERIKSA');

-- AlterTable
ALTER TABLE "Antrian" ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "statusAntrian" "StatusAntrian" NOT NULL DEFAULT 'MENUNGGU';
