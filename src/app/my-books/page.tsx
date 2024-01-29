import Link from "next/link";

export default async function MyBooksPage() {
  return <>
    <h1  className="text-2xl">Mes Livres</h1>
    <Link href="/my-books/new">
      <button>Créer un livre</button>
    </Link>
  </>

}
