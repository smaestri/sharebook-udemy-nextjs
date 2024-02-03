import { db } from "@/lib/db";
import { Book } from "@prisma/client";
import Link from "next/link";
import {Button} from "@nextui-org/react"
import Image from "next/image"
import bookImg from '/public/book.png'
import { BookWithCategory } from "./[id]/page";
import { redirect } from "next/navigation";
import { deleteBook } from "@/lib/actions";


export default async function MyBooksPage() {

  let books: BookWithCategory[] = await db.book.findMany({
    include: {
      category: true
    }
  });
  console.log('books', books)
  const renderBooks = () => (
    books.map((book: BookWithCategory) => (
      <div
        key={book.id}
        className="flex flex-col m-5"
      >
        <div className="flex flex-row justify-center">
          <Image
            src={bookImg}
            alt="book"
            className="rounded-full"
            />
          <div><span className="italic">{book.title}</span></div>
        </div>
        <div>Auteur: <span className="italic">{book.author}</span></div>
        <div>Categorie: <span className="italic">{book.category.name}</span></div>

        <div className="flex flex-col items-center gap-2">
          <Link href={`/my-books/${book.id}`}>
            <Button>Modifier</Button>
          </Link>
            <form action={deleteBook.bind(null, book.id)}>
              <Button type="submit">Supprimer</Button>
            </form>
        </div>
      </div>))
  )

  return <>
    <h1 className="text-2xl">Mes Livres</h1>
    <div className="flex flex-wrap gap-4 mt-5 mb-5">
      {renderBooks()}
    </div>
    <Link href="/my-books/new">
      <button>Créer un livre</button>
    </Link>
  </>

}
