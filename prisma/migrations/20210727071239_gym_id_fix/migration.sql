/*
  Warnings:

  - You are about to drop the column `gymId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_gymId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "gymId",
ADD COLUMN     "gym_id" INTEGER;

-- AddForeignKey
ALTER TABLE "user" ADD FOREIGN KEY ("gym_id") REFERENCES "gym"("id") ON DELETE SET NULL ON UPDATE CASCADE;
