import {useParams} from "next/navigation";

export default function Page() {
    const params = useParams<{ userId: string }>()
    return (
        <main className="w-screen">
            <input/>
            <button></button>
        </main>
    )
}