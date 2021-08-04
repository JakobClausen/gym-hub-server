/*
  Warnings:

  - Added the required column `type` to the `workout_external_api` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_external_api" ADD COLUMN     "type" TEXT NOT NULL;
