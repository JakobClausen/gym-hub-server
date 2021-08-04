/*
  Warnings:

  - A unique constraint covering the columns `[gymId]` on the table `workout_external_api` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gymId` to the `workout_external_api` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_external_api" ADD COLUMN     "gymId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "workout_external_api_gymId_unique" ON "workout_external_api"("gymId");

-- AddForeignKey
ALTER TABLE "workout_external_api" ADD FOREIGN KEY ("gymId") REFERENCES "gym"("id") ON DELETE CASCADE ON UPDATE CASCADE;
