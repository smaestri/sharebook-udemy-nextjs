import BookForm from "@/components/book-form";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

interface EditBookProps {
    params: {
        id: string
    }
}

const booksWithCategory = Prisma.validator<Prisma.BookDefaultArgs>()({
    include: { category: true },
  })
  export type BookWithCategory = Prisma.BookGetPayload<typeof booksWithCategory>
  

export default async function EditBookPage(props: EditBookProps) {
    const categories = await db.category.findMany();

    const id = parseInt(props.params.id)
    const book: BookWithCategory | null = await db.book.findFirst({
        where: { id },
        include: {
            category: true,
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
