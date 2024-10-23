/*
  Warnings:

  - You are about to drop the `CodingJots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EngineerJots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FinanceJots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LawJots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MathJots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScienceJots` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CodingJots" DROP CONSTRAINT "CodingJots_userId_fkey";

-- DropForeignKey
ALTER TABLE "EngineerJots" DROP CONSTRAINT "EngineerJots_userId_fkey";

-- DropForeignKey
ALTER TABLE "FinanceJots" DROP CONSTRAINT "FinanceJots_userId_fkey";

-- DropForeignKey
ALTER TABLE "LawJots" DROP CONSTRAINT "LawJots_userId_fkey";

-- DropForeignKey
ALTER TABLE "MathJots" DROP CONSTRAINT "MathJots_userId_fkey";

-- DropForeignKey
ALTER TABLE "ScienceJots" DROP CONSTRAINT "ScienceJots_userId_fkey";

-- DropTable
DROP TABLE "CodingJots";

-- DropTable
DROP TABLE "EngineerJots";

-- DropTable
DROP TABLE "FinanceJots";

-- DropTable
DROP TABLE "LawJots";

-- DropTable
DROP TABLE "MathJots";

-- DropTable
DROP TABLE "ScienceJots";

-- CreateTable
CREATE TABLE "Jots" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Jots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Jots_id_key" ON "Jots"("id");

-- AddForeignKey
ALTER TABLE "Jots" ADD CONSTRAINT "Jots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
