/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `votes` on the `Idea` table. All the data in the column will be lost.
  - Changed the type of `category` on the `Idea` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "createdAt",
DROP COLUMN "votes",
DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Category";
