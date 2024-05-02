/*
  Warnings:

  - The `age` column on the `Animal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `Animal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNDEFINED');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('CUB', 'YOUNG', 'ADULT', 'ELDERLY');

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "age",
ADD COLUMN     "age" "Age" NOT NULL DEFAULT 'ADULT',
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'UNDEFINED';

-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL,
    "specieId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" "Age" NOT NULL DEFAULT 'ADULT',
    "examType" TEXT NOT NULL,
    "values" JSONB NOT NULL,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_specieId_fkey" FOREIGN KEY ("specieId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
