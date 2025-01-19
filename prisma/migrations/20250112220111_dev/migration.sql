/*
  Warnings:

  - You are about to drop the column `tanggal` on the `Antrian` table. All the data in the column will be lost.
  - You are about to drop the column `tamggal` on the `Jadwal` table. All the data in the column will be lost.
  - Added the required column `tanggal` to the `Jadwal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Antrian" DROP COLUMN "tanggal";

-- AlterTable
ALTER TABLE "Jadwal" DROP COLUMN "tamggal",
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL;
