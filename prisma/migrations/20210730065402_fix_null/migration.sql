/*
  Warnings:

  - Made the column `type` on table `gym_class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `workout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "gym_class" ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "workout" ALTER COLUMN "type" SET NOT NULL;
