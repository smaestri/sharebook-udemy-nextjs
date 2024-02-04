"use client"
interface ErrroPageProps {
    error: Error;
    reset: ()=>void
}

export default function errorPage({error}: ErrroPageProps) {
    return <div>Une erreur est survenue: {error.message}</div>

}