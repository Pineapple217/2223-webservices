-- CreateTable
CREATE TABLE `User` (
    `auth0Id` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `User_auth0Id_key`(`auth0Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
