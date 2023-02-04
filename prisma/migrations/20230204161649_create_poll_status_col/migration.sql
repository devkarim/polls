/*
  Warnings:

  - Made the column `supportsMultiVote` on table `Poll` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PollStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "status" "PollStatus" NOT NULL DEFAULT 'OPEN',
ALTER COLUMN "supportsMultiVote" SET NOT NULL;
