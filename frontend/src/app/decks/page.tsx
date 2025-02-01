'use client'

import React, {useEffect, useState} from "react";
import {Deck} from "@/types/deck";
import Cookies from "js-cookie";
import {Pageable} from "@/types/pageable";
import {getAllDecks} from "@/services/deckService";
import Link from "next/link";

export default function Page() {
    const [decks, setDecks] = useState<Deck[]>([]);

    useEffect(() => {
        const token = Cookies.get("accessToken");

        if (token) {
            getAllDecks(token).then((page: Pageable<Deck>) => {
                setDecks(page.content);
            })
        }
    }, []);

    return (
        <main className="w-screen flex justify-center">
            <section className="w-11/12 mt-10 flex flex-wrap">
                {decks && decks.map((deck) => <DeckElement deck={deck} key={deck.id}/>)}
                <button className="w-48 h-64 rounded bg-accent-600 flex justify-center flex-col items-center p-1 m-4">
                    <span className="material-icons text-text-50">add</span></button>
            </section>
        </main>
    )
}

interface DeckProps {
    deck: Deck
}

const DeckElement: React.FC<DeckProps> = ({deck}) => {
    return (
        <Link href={`/decks/${deck.id}`} className="w-48 h-64 rounded bg-accent-600 flex flex-col items-center p-2 m-4">
            <h2 className="text-text-50">{deck.name}</h2>
        </Link>
    )
}