"use client"
import { BookWithCategory } from "@/app/my-books/[id]/page";
import { createOrUpdateBook } from "@/lib/actions";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Category } from "@prisma/client";
import { useFormState } from "react-dom";

interface BookFormProps {
    book?: BookWithCategory;
    categories: Category[]
}

export default function BookForm({ book, categories }: BookFormProps) {

    const [formState, action] = useFormState(createOrUpdateBook.bind(null, book), {
      message: ""
    })

    return (<form action={action}>
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
          <div>
          {formState.message? <div className="p-2 bg-red-200 border border-red-400">{formState.message}</div> : null}
          </div>
            <Button type="submit">Sauvegarder</Button>
        </div>
    </form>
    )
}