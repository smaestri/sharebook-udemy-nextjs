import { db } from "@/lib/db"
import { Book } from "@prisma/client";
import { redirect } from "next/navigation"

interface BookFormProps {
    book?: Book;
}

export default async function BookForm({book} : BookFormProps) {
    async function createBook( formData: FormData) {
        "use server"
        console.log('creating book')

        const title =  formData.get('title') as string
        const author =  formData.get('author') as string
        const book = await db.book.create({
            data: {
                title,
                author
            }
        })
        console.log(book)
        redirect('/my-books')
    }

    async function updateBook( formData: FormData) {
        "use server"
        const title =  formData.get('title') as string
        const author =  formData.get('author') as string
        console.log('updating book')

        if(!book){
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

    return (<form action={book?updateBook : createBook}>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label htmlFor="title">Titre</label>
                <input  type="text" name="title" defaultValue={book?.title} className="border rounded" />
            </div>
            <div className="flex gap-4">
                <label htmlFor="author">Auteur</label>
                <input type="text" name="author" defaultValue={book?.author}  className="border rounded" />
            </div>
        </div>
        <button type="submit">Sauvegarder</button>

    </form>
    )
}