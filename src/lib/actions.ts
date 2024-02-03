"use server"

import { redirect } from "next/navigation"
import { db } from "./db"
import { Book } from "@prisma/client"



export async function deleteBook(id: number) {
    console.log('delete book', id)
    await db.book.delete({
        where: { id },

    })
    redirect('/my-books')
}

export async function createOrUpdateBook(book: Book | undefined, formState: { message: string }, formData: FormData) {

    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const category = formData.get('category') as string
    if (typeof title !== 'string' || title.length < 3) {
        return {
            message: "Titile must be longer"
        }
    }

    if (typeof author !== 'string' || author.length < 3) {
        return {
            message: "Author must be longer"
        }
    }

    if (!book) {
        await db.book.create({
            data: {
                title,
                author,
                categoryId: parseInt(category),
            }
        })
    } else {
        await db.book.update({
            where: { id: book.id },
            data: {
                title,
                author,
                categoryId: parseInt(category),

            }
        })
    }
    redirect('/my-books')
}
