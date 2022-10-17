-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "supportsMultiVote" BOOLEAN DEFAULT false,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "votes" INTEGER DEFAULT 0,
    "pollId" TEXT,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Poll_code_key" ON "Poll"("code");
