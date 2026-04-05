-- CreateTable
CREATE TABLE "tbl_merek_mesin" (
    "id_merek" SERIAL NOT NULL,
    "nm_merek" TEXT NOT NULL,

    CONSTRAINT "tbl_merek_mesin_pkey" PRIMARY KEY ("id_merek")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_merek_mesin_nm_merek_key" ON "tbl_merek_mesin"("nm_merek");
