/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Rating` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Rating` DROP FOREIGN KEY `Rating_reviewId_fkey`;

-- AlterTable
ALTER TABLE `Rating` DROP COLUMN `reviewId`;
