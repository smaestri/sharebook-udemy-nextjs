"use client"
import { BookWithCategory } from "@/app/my-books/[id]/page";
import { createOrUpdateBook } from "@/lib/actions";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Category } from "@prisma/client";

interface BookFormProps {
    book?: BookWithCategory;
    categories: Category[]
}

export default async function BookForm({ book, categories }: BookFormProps) {

    console.log('cate', categories)

    return (<form action={createOrUpdateBook.bind(null, book)}>
        <div className="space-y-4">
            <Input name="title" label="Title" defaultValue={book?.title} />
            <Input name="author" label="Author" defaultValue={book?.author} />
            <Select
            label="Category"
            defaultSelectedKeys={book?.categoryId ? [book.categoryId.toString()] : undefined}
            items={categories} name="category">
            {(category) => (
              <SelectItem key={category.id} value={category.id} >{category.name}</SelectItem>
            )}
          </Select>
            <Button type="submit">Sauvegarder</Button>
        </div>
    </form>
    )
}