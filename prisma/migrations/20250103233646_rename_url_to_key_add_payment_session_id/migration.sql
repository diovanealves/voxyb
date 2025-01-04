/*
  Warnings:

  - You are about to drop the column `url` on the `Audio` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_session_id]` on the table `Audio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Audio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_session_id` to the `Audio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Audio" DROP COLUMN "url",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "payment_session_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Audio_payment_session_id_key" ON "Audio"("payment_session_id");
