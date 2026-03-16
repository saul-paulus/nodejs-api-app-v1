-- CreateTable
CREATE TABLE "Permission" (
    "id_permission" SERIAL NOT NULL,
    "nm_permission" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id_permission")
);
