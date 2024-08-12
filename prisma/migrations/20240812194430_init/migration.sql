/*
  Warnings:

  - You are about to drop the column `userId` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Optional` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Optional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_userId_fkey";

-- DropForeignKey
ALTER TABLE "Optional" DROP CONSTRAINT "Optional_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_userId_fkey";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "userId",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "lastModifiedById" INTEGER;

-- AlterTable
ALTER TABLE "Optional" DROP COLUMN "userId",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "lastModifiedById" INTEGER;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "userId",
ADD COLUMN     "createdById" INTEGER NOT NULL,
ADD COLUMN     "lastModifiedById" INTEGER;

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Optional" ADD CONSTRAINT "Optional_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
