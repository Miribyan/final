/*
  Warnings:

  - You are about to drop the column `filmId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `filmId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Film` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_filmId_fkey`;

-- AlterTable
ALTER TABLE `Rating` DROP COLUMN `filmId`,
    ADD COLUMN `workId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `filmId`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `workId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Film`;

-- CreateTable
CREATE TABLE `Work` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `director` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Taggings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `review_work_id` ON `Review`(`workId`);

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
