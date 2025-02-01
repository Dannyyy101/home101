'use client'

import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {getDeckById} from "@/services/deckService";
import {useParams} from "next/navigation";
import {Deck} from "@/types/deck";
import {LearnModus} from "@/components/LearnModus";

export default function Page() {
    // const [edit, setEdit] = useState<boolean>(false)
    const [deck, setDeck] = useState<Deck | null>(null)
    const [learnModi, setLearnModi] = useState<boolean>(false)
    const params = useParams<{ deckId: string }>()

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            getDeckById(token, params.deckId).then((deck) => {
                setDeck(deck)
            })
        }
    }, []);

    return (
        <>{deck && (learnModi ? <LearnModus cards={deck.cards} stopLearnModi={() => setLearnModi(false)}/> :
            <main className="w-screen flex justify-center relative">
                <section className="w-11/12 flex items-center flex-col mt-4">
                    <h2 className="text-text-900">{deck.name}</h2>
                </section>
                <button onClick={() => setLearnModi((prevState) => !prevState)}
                        className="absolute top-8 right-8 bg-accent-600 w-28 h-10 rounded-lg">Learnmodus
                </button>
            </main>)}
        </>
    )
}

