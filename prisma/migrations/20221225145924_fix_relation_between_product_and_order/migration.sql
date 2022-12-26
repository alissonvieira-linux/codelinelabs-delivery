/*
  Warnings:

  - You are about to drop the `producttoorder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `products_ids` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `producttoorder` DROP FOREIGN KEY `ProductToOrder_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `producttoorder` DROP FOREIGN KEY `ProductToOrder_product_id_fkey`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `products_ids` INTEGER NOT NULL;

-- DropTable
DROP TABLE `producttoorder`;

-- CreateTable
CREATE TABLE `_OrderToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderToProduct_AB_unique`(`A`, `B`),
    INDEX `_OrderToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
