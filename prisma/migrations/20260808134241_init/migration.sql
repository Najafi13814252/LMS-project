/*
  Warnings:

  - You are about to alter the column `userId` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `courseId` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[userId,courseId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Course_categoryId_fkey` ON `Course`;

-- AlterTable
ALTER TABLE `Purchase` MODIFY `userId` VARCHAR(100) NOT NULL,
    MODIFY `courseId` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Purchase_userId_courseId_key` ON `Purchase`(`userId`, `courseId`);

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProgress` ADD CONSTRAINT `UserProgress_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
