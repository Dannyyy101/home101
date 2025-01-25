import Link from "next/link";

export default function Navbar() {

    const routes = [{link: "./decks", title: "Decks"}, {link: "./docs", title: "Dokumente"}]

    return (
        <nav className="sticky top-0 left-0 w-screen h-16 bg-background-300 flex">
            <section className="w-1/3 flex justify-center items-center"><Link
                className="font-bold text-xl hover:underline"
                href={"/"}>Home101</Link></section>
            <section className="w-1/3 flex justify-center items-center">{routes.map((route) =>
                <Link className="font-bold text-xl hover:underline px-8 w-18"
                      key={route.link}
                      href={route.link}>{route.title}</Link>)}</section>
            <section className="w-1/3 flex justify-center items-center"><Link
                className="font-bold text-xl hover:underline"
                href={"./user"}>Account</Link></section>
        </nav>
    )
}