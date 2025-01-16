-- CreateTable
CREATE TABLE `pesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `makananId` INTEGER NOT NULL,
    `minumanId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pesanan` ADD CONSTRAINT `pesanan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesanan` ADD CONSTRAINT `pesanan_makananId_fkey` FOREIGN KEY (`makananId`) REFERENCES `makanan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesanan` ADD CONSTRAINT `pesanan_minumanId_fkey` FOREIGN KEY (`minumanId`) REFERENCES `minuman`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
