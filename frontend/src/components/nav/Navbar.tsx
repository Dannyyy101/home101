'use client'
import Link from "next/link";
import {useState} from "react";

export default function Navbar() {
    const [showHamburgerItems, setShowHamburgerItems] = useState<boolean>(false);
    const routes = [{link: "./decks", title: "Decks"}, {link: "./docs", title: "Dokumente"}]

    return (
        <nav className="sticky top-0 left-0 w-screen h-16 bg-background-300 flex z-50">
            <section className="w-1/2 flex justify-center items-center md:w-1/3"><Link
                className="font-bold text-xl hover:underline"
                href={"/"}>Home101</Link></section>
            <section className="w-1/3 hidden justify-center items-center flex-col md:flex">{routes.map((route) =>
                <Link className="font-bold text-xl hover:underline px-8 w-18"
                      key={route.link}
                      href={route.link}>{route.title}</Link>)}</section>
            <section className="w-1/2 flex justify-end items-center md:w-1/3">
                <Link
                    className="font-bold text-xl mr-0 hover:underline md:mr-4"
                    href={"./user"}>Account</Link>
                <button className="ml-8 mr-4 items-center flex md:hidden"
                        onClick={() => setShowHamburgerItems(!showHamburgerItems)}>
                    <span className="material-icons text-text-50 text-xl">
                        menu
                    </span>
                </button>
            </section>
            {showHamburgerItems &&
                <section
                    className="absolute top-16 right-0 flex justify-center items-center flex-col bg-background-300 h-full z-50 md:hidden">
                    {routes.map((route) =>
                    <Link className="font-bold text-xl hover:underline px-8 w-18"
                          key={route.link}
                          href={route.link}>{route.title}</Link>)}
                </section>
            }
        </nav>
    )
}