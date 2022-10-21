-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "ipAddresses" TEXT[] DEFAULT ARRAY[]::TEXT[];
