import Link from "next/link";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

export default async function Navigation() {
   const categories = await db.category.findMany();

   const renderCategories = categories.map((cat: Category) => {
     return (<div key={cat.id}><Link href={{ pathname: `/list-books`, query: { categoryId: cat.id } }} >{cat.name}</Link></div>)
   })
  return (<div className="flex flex-col">
    {renderCategories}
    </div>
  )
}
