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

    CONSTRAINT "Pemeriksaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resep" (
    "id" TEXT NOT NULL,
    "pemeriksaanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalHarga" INTEGER NOT NULL,
    "dibayar" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Resep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResepObat" (
    "id" TEXT NOT NULL,
    "obatId" TEXT NOT NULL,
    "resepId" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,

    CONSTRAINT "ResepObat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pemeriksaan" ADD CONSTRAINT "Pemeriksaan_dokterId_fkey" FOREIGN KEY ("dokterId") REFERENCES "Dokter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemeriksaan" ADD CONSTRAINT "Pemeriksaan_pasienNik_fkey" FOREIGN KEY ("pasienNik") REFERENCES "Pasien"("nik") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResepObat" ADD CONSTRAINT "ResepObat_obatId_fkey" FOREIGN KEY ("obatId") REFERENCES "Obat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResepObat" ADD CONSTRAINT "ResepObat_resepId_fkey" FOREIGN KEY ("resepId") REFERENCES "Resep"("id") ON DELETE CASCADE ON UPDATE CASCADE;
