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

export async function createOrUpdateBook(book: Book | undefined , formState: {message: string}, formData: FormData) {

    return {
        message: "must be longer"
    }
    // console.log('creating book')

    // const title = formData.get('title') as string
    // const author = formData.get('author') as string
    // const category = formData.get('category') as string

    // if (!book) {
    //     await db.book.create({
    //         data: {
    //             title,
    //             author,
    //             categoryId: parseInt(category),
    //         }
    //     })
    // } else {
    //     await db.book.update({
    //         where: { id: book.id },
    //         data: {
    //             title,
    //             author,
    //             categoryId: parseInt(category),

    //         }
    //     })
    // }

    // console.log(book)
    // redirect('/my-books')
}
