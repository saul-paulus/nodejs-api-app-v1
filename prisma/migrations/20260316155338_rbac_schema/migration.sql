-- CreateTable
CREATE TABLE "tbl_permission" (
    "id_permission" SERIAL NOT NULL,
    "nm_permission" TEXT NOT NULL,

    CONSTRAINT "tbl_permission_pkey" PRIMARY KEY ("id_permission")
);

-- CreateTable
CREATE TABLE "tbl_role_permission" (
    "idRole" INTEGER NOT NULL,
    "idPermission" INTEGER NOT NULL,

    CONSTRAINT "tbl_role_permission_pkey" PRIMARY KEY ("idRole","idPermission")
);

-- CreateTable
CREATE TABLE "tbl_role" (
    "id_role" SERIAL NOT NULL,
    "nm_role" TEXT NOT NULL,

    CONSTRAINT "tbl_role_pkey" PRIMARY KEY ("id_role")
);

-- CreateTable
CREATE TABLE "tbl_user_role" (
    "idUser" INTEGER NOT NULL,
    "idRole" INTEGER NOT NULL,

    CONSTRAINT "tbl_user_role_pkey" PRIMARY KEY ("idUser","idRole")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "id_personal" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "codeuker" TEXT NOT NULL,
    "id_role" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_personal_key" ON "Users"("id_personal");

-- AddForeignKey
ALTER TABLE "tbl_role_permission" ADD CONSTRAINT "tbl_role_permission_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "tbl_role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_role_permission" ADD CONSTRAINT "tbl_role_permission_idPermission_fkey" FOREIGN KEY ("idPermission") REFERENCES "tbl_permission"("id_permission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_role" ADD CONSTRAINT "tbl_user_role_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_user_role" ADD CONSTRAINT "tbl_user_role_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "tbl_role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;
