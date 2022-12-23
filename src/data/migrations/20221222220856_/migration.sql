/*
  Warnings:

  - Made the column `position` on table `racesondrivers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `racesondrivers` MODIFY `position` INTEGER NOT NULL;
