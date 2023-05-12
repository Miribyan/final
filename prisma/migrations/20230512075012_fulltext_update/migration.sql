-- CreateIndex
CREATE FULLTEXT INDEX `Comment_content_idx` ON `Comment`(`content`);

-- CreateIndex
CREATE FULLTEXT INDEX `Review_content_category_reviewName_idx` ON `Review`(`content`, `category`, `reviewName`);

-- CreateIndex
CREATE FULLTEXT INDEX `Tag_title_idx` ON `Tag`(`title`);

-- CreateIndex
CREATE FULLTEXT INDEX `User_name_idx` ON `User`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Work_title_year_author_idx` ON `Work`(`title`, `author`);
