-- CreateTable
CREATE TABLE "tbl_vendors" (
    "id_vendor" SERIAL NOT NULL,
    "nm_vendor" TEXT NOT NULL,
    "code_vendor" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_vendors_pkey" PRIMARY KEY ("id_vendor")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_vendors_code_vendor_key" ON "tbl_vendors"("code_vendor");
