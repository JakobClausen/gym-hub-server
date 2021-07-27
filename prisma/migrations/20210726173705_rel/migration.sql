/*
  Warnings:

  - You are about to drop the column `userId` on the `gym` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "gym" DROP CONSTRAINT "gym_userId_fkey";

-- DropIndex
DROP INDEX "gym_userId_unique";

-- AlterTable
ALTER TABLE "gym" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "gymId" INTEGER;

-- AddForeignKey
ALTER TABLE "user" ADD FOREIGN KEY ("gymId") REFERENCES "gym"("id") ON DELETE SET NULL ON UPDATE CASCADE;
