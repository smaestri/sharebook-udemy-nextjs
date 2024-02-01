/*
  Warnings:

  - Added the required column `categoryId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- clear book table
delete from book;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'FREE',
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("author", "id", "status", "title") SELECT "author", "id", "status", "title" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
