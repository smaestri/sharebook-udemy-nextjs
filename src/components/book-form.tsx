"use client"
import { createOrUpdateBook } from "@/lib/actions";
import { Input } from "@nextui-org/react";
import { Book } from "@prisma/client";

interface BookFormProps {
    book?: Book;
}

export default async function BookForm({ book }: BookFormProps) {

    return (<form action={createOrUpdateBook.bind(null, book)}>
        <div className="space-y-4">
            <Input name="title" label="Title" defaultValue={book?.title} />
            <Input name="author" label="Author" defaultValue={book?.author} />
            <button type="submit">Sauvegarder</button>
        </div>
    </form>
    )
}