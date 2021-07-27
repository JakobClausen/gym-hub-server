/*
  Warnings:

  - You are about to drop the column `gymId` on the `gym_class` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "gym_class" DROP CONSTRAINT "gym_class_gymId_fkey";

-- AlterTable
ALTER TABLE "gym_class" DROP COLUMN "gymId",
ADD COLUMN     "gym_id" INTEGER;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gym_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "gym_class" ADD FOREIGN KEY ("gym_id") REFERENCES "gym"("id") ON DELETE SET NULL ON UPDATE CASCADE;
