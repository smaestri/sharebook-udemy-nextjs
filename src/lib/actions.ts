"use server"

import { redirect } from "next/navigation"
import { db } from "./db"
import { Book } from "@prisma/client"
import { revalidatePath } from "next/cache"
import * as auth from '@/auth'



export async function deleteBook(id: number) {
    await db.book.delete({
        where: { id },

    })
    revalidatePath('/my-books')
    redirect('/my-books')
}

export async function createOrUpdateBook(book: Book | undefined, formState: { message: string }, formData: FormData) {
    const session = await auth.auth()
    if (!session || !session.user) {
        return {
            message: "Please login"
        }
    }

    try {
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
                    userId: session.user.id
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
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message
            }
        } else {
            return {
                message: 'Something went wrong'
            }
        }
    }
    revalidatePath('/my-books')

    redirect('/my-books')

}

export async function signIn() {
    return auth.signIn("github")
}

export async function signOut() {
    return auth.signOut()
}

export async function borrowBook(bookId: number) {
    const session = await auth.auth()
    if (!session || !session.user) {
        return
    }
    await db.borrow.create({
        data: {
            bookId,
            borrowerId: session.user.id
        }
    })
    await db.book.update({
        where: { id: bookId },
        data: {
            status: "BORROWED"
        }
    })
    revalidatePath('/borrows')
    redirect('/borrows')
}
