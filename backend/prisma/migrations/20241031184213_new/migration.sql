-- DropForeignKey
ALTER TABLE "Jots" DROP CONSTRAINT "Jots_userId_fkey";

-- AddForeignKey
ALTER TABLE "Jots" ADD CONSTRAINT "Jots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
