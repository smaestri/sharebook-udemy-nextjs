import { db } from "@/lib/db";
import Image from "next/image"
import bookImg from '/public/book.png'
import { BookWithCategoryAndUser } from "../my-books/[id]/page";

interface ListBooksProps{
  searchParams: {
      categoryId: string
  }
}

export default async function ListBooksPage({searchParams} : ListBooksProps) {

  const books: BookWithCategoryAndUser[] = await db.book.findMany({
    include: {
      category: true,
      user: true

    },
    where: {
      categoryId: parseInt(searchParams.categoryId),
    }
  });

  const category = await db.category.findFirst({
    where: { id: parseInt(searchParams.categoryId) }
  })

  const renderBooks = () => (
    books.map((book: BookWithCategoryAndUser) => (
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
        <div>Propriétaire: <span className="italic">{book.user.email}</span></div>

      </div>))
  )

  return <>
    <h1 className="text-2xl">Livres pour catégorie {category?.name}</h1>
    <div className="flex flex-wrap gap-4 mt-5 mb-5">
      {renderBooks()}
    </div>
  </>

}
