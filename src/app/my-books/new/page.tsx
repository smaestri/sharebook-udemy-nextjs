import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function CreateBookPage() {
    async function createBook( formData: FormData) {
        "use server"
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

    return (<form action={createBook}>
        <h1 className="text-2xl">Create a book</h1>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <label htmlFor="title">Titre</label>
                <input type="text" name="title" className="border rounded" />
            </div>
            <div className="flex gap-4">
                <label htmlFor="author">Auteur</label>
                <input type="text" name="author" className="border rounded" />
            </div>
        </div>
        <button type="submit">Create </button>

    </form>
    )
}