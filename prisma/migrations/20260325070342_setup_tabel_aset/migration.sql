-- CreateTable
CREATE TABLE "AsetTmp" (
    "id_aset_tmp" SERIAL NOT NULL,
    "id_vendor" INTEGER NOT NULL,
    "id_merek_mesin" INTEGER NOT NULL,
    "id_jenis_mesin" INTEGER NOT NULL,
    "id_kelolaan" INTEGER NOT NULL,
    "id_kanwil" INTEGER NOT NULL,
    "tid" TEXT,
    "tid_ecp" TEXT,
    "lokasi_atm" TEXT NOT NULL,
    "codeuker" TEXT NOT NULL,
    "sn_mesin" TEXT NOT NULL,
    "batch_to" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AsetTmp_pkey" PRIMARY KEY ("id_aset_tmp")
);

-- CreateTable
CREATE TABLE "tbl_jenis_mesin" (
    "id_jenis_mesin" SERIAL NOT NULL,
    "nm_jenis_mesin" TEXT NOT NULL,

    CONSTRAINT "tbl_jenis_mesin_pkey" PRIMARY KEY ("id_jenis_mesin")
);

-- CreateTable
CREATE TABLE "tbl_kanwil" (
    "id_kanwil" SERIAL NOT NULL,
    "nm_kanwil" TEXT NOT NULL,

    CONSTRAINT "tbl_kanwil_pkey" PRIMARY KEY ("id_kanwil")
);

-- CreateTable
CREATE TABLE "tbl_kelolaan" (
    "id_kelolaan" SERIAL NOT NULL,
    "nm_kelolaan" TEXT NOT NULL,

    CONSTRAINT "tbl_kelolaan_pkey" PRIMARY KEY ("id_kelolaan")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_jenis_mesin_nm_jenis_mesin_key" ON "tbl_jenis_mesin"("nm_jenis_mesin");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_kanwil_nm_kanwil_key" ON "tbl_kanwil"("nm_kanwil");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_kelolaan_nm_kelolaan_key" ON "tbl_kelolaan"("nm_kelolaan");
