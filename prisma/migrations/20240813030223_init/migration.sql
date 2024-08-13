/*
  Warnings:

  - You are about to drop the column `optionalId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_optionalId_fkey";

-- DropIndex
DROP INDEX "Vehicle_optionalId_idx";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "optionalId";

-- CreateTable
CREATE TABLE "_VehicleOptionals" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VehicleOptionals_AB_unique" ON "_VehicleOptionals"("A", "B");

-- CreateIndex
CREATE INDEX "_VehicleOptionals_B_index" ON "_VehicleOptionals"("B");

-- AddForeignKey
ALTER TABLE "_VehicleOptionals" ADD CONSTRAINT "_VehicleOptionals_A_fkey" FOREIGN KEY ("A") REFERENCES "Optional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VehicleOptionals" ADD CONSTRAINT "_VehicleOptionals_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
