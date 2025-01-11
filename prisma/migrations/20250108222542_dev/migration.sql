/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dokters` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PASIEN', 'DOKTER', 'RESEPSIONIS');

-- CreateEnum
CREATE TYPE "GolonganObat" AS ENUM ('BEBAS', 'BEBAS_TERBATAS', 'KERAS', 'NARKOTIKA', 'FITOMARKA', 'JAMU', 'HERBAL');

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_dokter_id_fkey";

-- AlterTable
ALTER TABLE "Pasien" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dokter_id" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'PASIEN',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "dokters";

-- CreateTable
CREATE TABLE "Dokter" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nomorStr" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "statusDokter" "StatusDokter" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dokter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obat" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "golongan" "GolonganObat" NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "aturanPakai" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Obat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dokter_nomorStr_key" ON "Dokter"("nomorStr");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_dokter_id_fkey" FOREIGN KEY ("dokter_id") REFERENCES "Dokter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
