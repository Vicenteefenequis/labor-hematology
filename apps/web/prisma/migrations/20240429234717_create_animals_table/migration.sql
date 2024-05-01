-- CreateEnum
CREATE TYPE "Mark" AS ENUM ('MICROCHIP', 'WASHER', 'UNMARKED');

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trackingMark" TEXT,
    "markType" "Mark" NOT NULL DEFAULT 'UNMARKED',
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Animal_id_idx" ON "Animal"("id");

-- CreateIndex
CREATE INDEX "Animal_updatedAt_idx" ON "Animal"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_id_trackingMark_key" ON "Animal"("id", "trackingMark");
