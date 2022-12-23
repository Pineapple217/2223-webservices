-- AlterTable
ALTER TABLE `racesondrivers` ALTER COLUMN `driverId` DROP DEFAULT,
    MODIFY `position` INTEGER NOT NULL DEFAULT -1;
