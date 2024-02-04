"use client"
import Link from "next/link";
import { Button, Navbar, NavbarBrand, NavbarContent, Image } from "@nextui-org/react";
import SearchInput from "./search-input";
import { signIn, signOut } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default async function Header() {
  const router = useRouter()
  return (
    <Navbar isBordered maxWidth={'full'}>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/">
            <Image />
            <p className="hidden sm:block font-bold text-inherit">Sharebook</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
    <Link href="/my-books">Mes livres</Link>
    <Link href="/borrows">Mes emprunts</Link>
        <SearchInput />
        <Button onPress={(e:any) => {console.log(e);signIn()}}>Sign In</Button>
        <Button onPress={()=> {
          signOut();
          //router.push("/")
        }
        }>Sign Out</Button>

      </NavbarContent>
    </Navbar>
  )
}