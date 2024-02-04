import BookForm from "@/components/book-form";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

interface EditBookProps {
    params: {
        id: string
    }
}

const booksWithCategoryAndUser = Prisma.validator<Prisma.BookDefaultArgs>()({
    include: { category: true, user: true },
})
export type BookWithCategoryAndUser = Prisma.BookGetPayload<typeof booksWithCategoryAndUser>
  

export default async function EditBookPage(props: EditBookProps) {
    const categories = await db.category.findMany();

    const id = parseInt(props.params.id)
    const book: BookWithCategoryAndUser | null = await db.book.findFirst({
        where: { id },
        include: {
            category: true,
            user: true
          }
    })

    if(!book) {
        return notFound();
    }

    return (
        <>
            <h1 className="text-2xl">Modifier un Livre</h1>
            <BookForm book={book} categories={categories} />
        </>
    )

}

export async function generateStaticParams() {
    const books = await db.book.findMany();

    return books.map((book) => {
        return {
            id: book.id.toString(),
        };
    });
}
