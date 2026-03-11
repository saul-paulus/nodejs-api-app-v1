-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "id_personal" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "codeuker" TEXT NOT NULL,
    "id_wewenang" INTEGER NOT NULL,
    "created_at" TIMESTAMP(20) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(20) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_personal_key" ON "User" ("id_personal");