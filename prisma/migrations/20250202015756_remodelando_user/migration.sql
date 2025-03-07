/*
  Warnings:

  - You are about to drop the column `cnpj` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_cnpj_key` ON `user`;

-- DropIndex
DROP INDEX `User_cpf_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `cnpj`,
    DROP COLUMN `cpf`,
    ADD COLUMN `document` VARCHAR(191) NOT NULL,
    ADD COLUMN `documentType` ENUM('CPF', 'CNPJ') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_document_key` ON `User`(`document`);
