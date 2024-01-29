import BookForm from "@/components/book-form";
import { db } from "@/lib/db";
import { Book } from "@prisma/client";

interface EditBookProps {
    params: {
        id: string
    }
}

export default async function EditBookPage(props: EditBookProps) {

    const id = parseInt(props.params.id)
    const book: Book = await db.book.findFirst({
        where: { id }
    })

    return (
        <>
            <h1 className="text-2xl">Modifier un Livre</h1>
            <BookForm book={book} />
        </>
    )

}
