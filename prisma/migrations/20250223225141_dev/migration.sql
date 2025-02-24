-- CreateTable
CREATE TABLE "JamBuka" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "status" "StatusKlinik" NOT NULL,

    CONSTRAINT "JamBuka_pkey" PRIMARY KEY ("id")
);
