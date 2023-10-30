/*
  Warnings:

  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "title" TEXT NOT NULL;
