/*
  Warnings:

  - Added the required column `order` to the `workout_section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workout_section" ADD COLUMN     "order" INTEGER NOT NULL;
