-- CreateTable
CREATE TABLE "tbl_cabbg" (
    "id_cabbg" SERIAL NOT NULL,
    "cabcabbg" TEXT NOT NULL,
    "nmcabbg" TEXT NOT NULL,
    "codeuker" TEXT NOT NULL,
    "ind" TEXT NOT NULL,
    "kol" INTEGER NOT NULL,

    CONSTRAINT "tbl_cabbg_pkey" PRIMARY KEY ("id_cabbg")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_cabbg_codeuker_key" ON "tbl_cabbg"("codeuker");
