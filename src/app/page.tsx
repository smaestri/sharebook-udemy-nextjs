import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return <div>
   Page d Accueil
   {session?.user ? <div>{JSON.stringify(session.user)}</div> : <div>Signed out</div>}

    </div>
}
 