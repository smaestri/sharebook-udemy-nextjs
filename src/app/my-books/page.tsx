import { db } from "@/lib/db";
import { Book } from "@prisma/client";
import Link from "next/link";
import Image from "next/image"


export default async function MyBooksPage() {
  const books = await db.book.findMany();
  console.log('books', books)
  const renderBooks = () => (
    books.map((book: Book) => (<div>
      <Image src="" alt="book" />
      <div>{book.id}</div>
      <div>{book.title}</div>
      <div>{book.author}</div>
      <div> <Link href={`/my-books/${book.id}`}>
        <button>Modifier</button>
      </Link></div>
    </div>))
  )

  return <>
    <h1 className="text-2xl">Mes Livres</h1>
    {renderBooks()}
    <Link href="/my-books/new">

      <button>Créer un livre</button>
    </Link>
  </>

}
