/*
  Warnings:

  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nik]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nik` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "GolonganDarah" AS ENUM ('A', 'B', 'AB', 'O');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKILAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "StatusDokter" AS ENUM ('AKTIF', 'CUTI', 'PENSIUN');

-- CreateEnum
CREATE TYPE "StatusPasien" AS ENUM ('MENIKAH', 'LAJANG');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_verified",
DROP COLUMN "image",
DROP COLUMN "name",
ADD COLUMN     "nik" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "verification_tokens";

-- CreateTable
CREATE TABLE "Pasien" (
    "nik" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "golonganDarah" "GolonganDarah",
    "tanggalLahir" TIMESTAMP(3),
    "alamat" TEXT,
    "noHp" TEXT,
    "jenisKelamin" "JenisKelamin",
    "status" "StatusPasien",

    CONSTRAINT "Pasien_pkey" PRIMARY KEY ("nik")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "dokter_id" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dokters" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "nomorStr" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "statusDokter" "StatusDokter" NOT NULL,

    CONSTRAINT "dokters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dokters_nomorStr_key" ON "dokters"("nomorStr");

-- CreateIndex
CREATE UNIQUE INDEX "users_nik_key" ON "users"("nik");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_dokter_id_fkey" FOREIGN KEY ("dokter_id") REFERENCES "dokters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
