-- CreateTable
CREATE TABLE "Role" (
    "id_role" SERIAL NOT NULL,
    "nm_role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id_role")
);
