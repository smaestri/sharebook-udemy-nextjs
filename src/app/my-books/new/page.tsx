import BookForm from "@/components/book-form";

export default async function CreateBookPage() {
    return (<>
        <h1 className="text-2xl">Créer un Livre</h1>
        <BookForm />
    </>)
}