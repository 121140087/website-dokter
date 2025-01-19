/*
  Warnings:

  - You are about to drop the `AntrianDate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Antrian" DROP CONSTRAINT "Antrian_antrianDateId_fkey";

-- DropTable
DROP TABLE "AntrianDate";

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" TEXT NOT NULL,
    "jumlahAntrian" INTEGER NOT NULL,
    "tamggal" TIMESTAMP(3) NOT NULL,
    "statusKlinik" "StatusKlinik" NOT NULL,
    "keteranganTutup" TEXT,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Antrian" ADD CONSTRAINT "Antrian_antrianDateId_fkey" FOREIGN KEY ("antrianDateId") REFERENCES "Jadwal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
