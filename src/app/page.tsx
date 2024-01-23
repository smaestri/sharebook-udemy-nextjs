import Link from "next/link";

export default async function Home() {
  return <div>
    <Link href="/">Home</Link>
    <Link href="my-books">Mes livres</Link>
    <Link href="list-books">livres</Link>*
    <Link href="borrows">Mes emprunts</Link>
    <Link href="search">Recherche</Link>

    </div>
}
 