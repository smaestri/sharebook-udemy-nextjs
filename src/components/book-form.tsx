import { db } from "@/lib/db"
import { Input } from "@nextui-org/react";
import { Book } from "@prisma/client";
import { redirect } from "next/navigation"

interface BookFormProps {
    book?: Book;
}

export default async function BookForm({ book }: BookFormProps) {
    async function createBook(formData: FormData) {
        "use server"
        console.log('creating book')

        const title = formData.get('title') as string
        const author = formData.get('author') as string
        const book = await db.book.create({
            data: {
                title,
                author
            }
        })
        console.log(book)
        redirect('/my-books')
    }

    async function updateBook(formData: FormData) {
        "use server"
        const title = formData.get('title') as string
        const author = formData.get('author') as string
        console.log('updating book')

        if (!book) {
            console.error("book not found")
            return;
        }
        const updatedBook = await db.book.update({
            where: { id: book.id },
            data: {
                title,
                author
            }
        })
        console.log(updatedBook)
        redirect('/my-books')
    }

    return (<form action={book ? updateBook : createBook}>
        <div className="space-y-4">
            <Input name="title" label="Title" defaultValue={book?.title} />
            <Input name="author" label="Author" defaultValue={book?.author} />
            <button type="submit">Sauvegarder</button>
        </div>
    </form>
    )
}