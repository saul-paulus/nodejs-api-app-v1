-- CreateTable
CREATE TABLE "tbl_project" (
    "id_project" SERIAL NOT NULL,
    "nm_project" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_project_pkey" PRIMARY KEY ("id_project")
);
