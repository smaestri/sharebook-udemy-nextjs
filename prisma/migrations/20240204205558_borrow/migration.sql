-- CreateTable
CREATE TABLE "Borrow" (
    "bookId" INTEGER NOT NULL,
    "borrowerId" TEXT NOT NULL,
    CONSTRAINT "Borrow_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Borrow_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Borrow_bookId_borrowerId_key" ON "Borrow"("bookId", "borrowerId");
