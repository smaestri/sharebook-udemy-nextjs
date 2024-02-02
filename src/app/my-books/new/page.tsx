import BookForm from "@/components/book-form";
import { db } from "@/lib/db";

export default async function CreateBookPage() {
    const categories = await db.category.findMany();

    return (<>
        <h1 className="text-2xl">Créer un Livre</h1>
        <BookForm categories={categories} />
    </>)
}