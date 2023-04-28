/*
  Warnings:

  - You are about to drop the column `created_at` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `film_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filmId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_author_id_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_film_id_fkey`;

-- AlterTable
ALTER TABLE `Film` DROP COLUMN `created_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `author_id`,
    DROP COLUMN `created_at`,
    DROP COLUMN `film_id`,
    DROP COLUMN `image_url`,
    ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `filmId` INTEGER NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `is_admin`,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `review_film_id` ON `Review`(`filmId`);

-- CreateIndex
CREATE INDEX `review_author_id` ON `Review`(`authorId`);

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_filmId_fkey` FOREIGN KEY (`filmId`) REFERENCES `Film`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
