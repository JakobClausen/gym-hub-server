/*
  Warnings:

  - You are about to drop the column `name` on the `gym_class` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gym_class" DROP COLUMN "name",
ADD COLUMN     "type" TEXT DEFAULT E'Crossfit';

-- AlterTable
ALTER TABLE "workout" DROP COLUMN "name",
ADD COLUMN     "type" TEXT DEFAULT E'Crossfit';
