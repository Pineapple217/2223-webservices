-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `base` VARCHAR(255) NOT NULL,
    `chief` VARCHAR(255) NOT NULL,
    `powerUnit` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Circuit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `nrOfLaps` INTEGER NOT NULL,
    `length` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Race` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start` DATETIME(3) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `isSprint` BOOLEAN NOT NULL,
    `circuitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Race` ADD CONSTRAINT `Race_circuitId_fkey` FOREIGN KEY (`circuitId`) REFERENCES `Circuit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
