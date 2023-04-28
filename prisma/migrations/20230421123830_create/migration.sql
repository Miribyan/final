-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `review_name` VARCHAR(191) NOT NULL,
    `film_id` INTEGER NOT NULL,
    `author_id` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `stars` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `review_film_id`(`film_id`),
    INDEX `review_author_id`(`author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_film_id_fkey` FOREIGN KEY (`film_id`) REFERENCES `Film`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
