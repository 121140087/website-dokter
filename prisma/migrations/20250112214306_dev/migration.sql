-- CreateEnum
CREATE TYPE "StatusKlinik" AS ENUM ('TUTUP', 'BUKA');

-- CreateTable
CREATE TABLE "AntrianDate" (
    "id" TEXT NOT NULL,
    "jumlahAntrian" INTEGER NOT NULL,
    "tamggal" TIMESTAMP(3) NOT NULL,
    "statusKlinik" "StatusKlinik" NOT NULL,
    "keteranganTutup" TEXT,

    CONSTRAINT "AntrianDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Antrian" (
    "id" TEXT NOT NULL,
    "noAntrian" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "antrianDateId" TEXT NOT NULL,
    "keluhan" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Antrian_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Antrian" ADD CONSTRAINT "Antrian_antrianDateId_fkey" FOREIGN KEY ("antrianDateId") REFERENCES "AntrianDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Antrian" ADD CONSTRAINT "Antrian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
