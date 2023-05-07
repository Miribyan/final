/*
  Warnings:

  - You are about to drop the column `director` on the `Work` table. All the data in the column will be lost.
  - Added the required column `reviewId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rating` ADD COLUMN `reviewId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Work` DROP COLUMN `director`,
    ADD COLUMN `author` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
