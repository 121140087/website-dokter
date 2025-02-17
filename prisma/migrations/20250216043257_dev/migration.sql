-- CreateEnum
CREATE TYPE "StatusAntrian" AS ENUM ('MENUNGGU', 'TIDAK_HADIR', 'BATAL', 'SEDANG_DIPERIKSA', 'SELESAI_DIPERIKSA');

-- CreateEnum
CREATE TYPE "StatusKlinik" AS ENUM ('TUTUP', 'BUKA');

-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('user', 'dokter', 'assistant');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PASIEN', 'DOKTER', 'RESEPSIONIS');

-- CreateEnum
CREATE TYPE "GolonganObat" AS ENUM ('BEBAS', 'BEBAS_TERBATAS', 'KERAS', 'NARKOTIKA', 'FITOMARKA', 'JAMU', 'HERBAL');

-- CreateEnum
CREATE TYPE "GolonganDarah" AS ENUM ('A', 'B', 'AB', 'O');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKILAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "StatusDokter" AS ENUM ('AKTIF', 'CUTI', 'PENSIUN');

-- CreateEnum
CREATE TYPE "StatusPasien" AS ENUM ('MENIKAH', 'LAJANG');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nik" TEXT,
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dokter_id" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PASIEN',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pasien_pkey" PRIMARY KEY ("nik")
);

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

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" TEXT NOT NULL,
    "lastMessage" TEXT,
    "lastChatRole" "ChatRole",
    "nama" TEXT NOT NULL,
    "unreadMessage" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "role" "ChatRole" NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" TEXT NOT NULL,
    "jumlahAntrian" INTEGER NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "statusKlinik" "StatusKlinik" NOT NULL,
    "keteranganTutup" TEXT,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Antrian" (
    "id" TEXT NOT NULL,
    "noAntrian" INTEGER NOT NULL,
    "pasienNIK" TEXT NOT NULL,
    "jadwalId" TEXT NOT NULL,
    "keluhan" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "statusAntrian" "StatusAntrian" NOT NULL DEFAULT 'MENUNGGU',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Antrian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pemeriksaan" (
    "id" TEXT NOT NULL,
    "dokterId" TEXT NOT NULL,
    "pasienNik" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "detakJantung" INTEGER NOT NULL,
    "gulaDarah" INTEGER NOT NULL,
    "trombosit" INTEGER NOT NULL,
    "tekananDarahTDS" INTEGER NOT NULL,
    "tekananDarahTTD" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dibayar" BOOLEAN NOT NULL DEFAULT false,
    "totalHarga" INTEGER NOT NULL,

    CONSTRAINT "Pemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResepObat" (
    "id" TEXT NOT NULL,
    "obatId" TEXT NOT NULL,
    "pemeriksaanId" TEXT NOT NULL,
    "resepId" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "ResepObat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_nik_key" ON "users"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_email_token_key" ON "verification_tokens"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Dokter_nomorStr_key" ON "Dokter"("nomorStr");

-- CreateIndex
CREATE UNIQUE INDEX "ResepObat_pemeriksaanId_key" ON "ResepObat"("pemeriksaanId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_dokter_id_fkey" FOREIGN KEY ("dokter_id") REFERENCES "Dokter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_nik_fkey" FOREIGN KEY ("nik") REFERENCES "Pasien"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Antrian" ADD CONSTRAINT "Antrian_jadwalId_fkey" FOREIGN KEY ("jadwalId") REFERENCES "Jadwal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Antrian" ADD CONSTRAINT "Antrian_pasienNIK_fkey" FOREIGN KEY ("pasienNIK") REFERENCES "Pasien"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemeriksaan" ADD CONSTRAINT "Pemeriksaan_dokterId_fkey" FOREIGN KEY ("dokterId") REFERENCES "Dokter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemeriksaan" ADD CONSTRAINT "Pemeriksaan_pasienNik_fkey" FOREIGN KEY ("pasienNik") REFERENCES "Pasien"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResepObat" ADD CONSTRAINT "ResepObat_pemeriksaanId_fkey" FOREIGN KEY ("pemeriksaanId") REFERENCES "Pemeriksaan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResepObat" ADD CONSTRAINT "ResepObat_obatId_fkey" FOREIGN KEY ("obatId") REFERENCES "Obat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
