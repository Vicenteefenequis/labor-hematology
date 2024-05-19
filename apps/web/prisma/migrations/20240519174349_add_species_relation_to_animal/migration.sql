/*
  Warnings:

  - Added the required column `speciesId` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "speciesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
