-- CreateTable
CREATE TABLE "CodingJots" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CodingJots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MathJots" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MathJots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScienceJots" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ScienceJots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceJots" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "FinanceJots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LawJots" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LawJots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngineerJots" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EngineerJots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CodingJots_id_key" ON "CodingJots"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MathJots_id_key" ON "MathJots"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScienceJots_id_key" ON "ScienceJots"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FinanceJots_id_key" ON "FinanceJots"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LawJots_id_key" ON "LawJots"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EngineerJots_id_key" ON "EngineerJots"("id");

-- AddForeignKey
ALTER TABLE "CodingJots" ADD CONSTRAINT "CodingJots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MathJots" ADD CONSTRAINT "MathJots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScienceJots" ADD CONSTRAINT "ScienceJots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceJots" ADD CONSTRAINT "FinanceJots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LawJots" ADD CONSTRAINT "LawJots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngineerJots" ADD CONSTRAINT "EngineerJots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
