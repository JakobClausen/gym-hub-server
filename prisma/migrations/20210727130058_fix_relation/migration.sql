/*
  Warnings:

  - Made the column `gym_id` on table `gym_class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gym_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "gym_class" ALTER COLUMN "gym_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "gym_id" SET NOT NULL;
