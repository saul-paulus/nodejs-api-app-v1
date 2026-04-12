/*
  Warnings:

  - A unique constraint covering the columns `[module,action]` on the table `tbl_permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `action` to the `tbl_permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `module` to the `tbl_permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_permission" ADD COLUMN     "action" TEXT NOT NULL,
ADD COLUMN     "module" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_permission_module_action_key" ON "tbl_permission"("module", "action");
