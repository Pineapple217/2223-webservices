/*
  Warnings:

  - Added the required column `assignedBy` to the `RacesOnDrivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `racesondrivers` ADD COLUMN `assignedBy` VARCHAR(191) NOT NULL;
