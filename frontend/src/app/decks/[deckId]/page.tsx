'use client'

import React, {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import {addCardsToDeck, getDeckById} from "@/services/deckService";
import {useParams} from "next/navigation";
import {Deck} from "@/types/deck";
import {LearnModus} from "@/components/LearnModus";
import {Card} from "@/types/card";
import {ObjectId} from "bson";
import {createNewCard, updateCard} from "@/services/cardService";
import {getMinutesBetweenToTimes, getTimeView} from "@/utils/time";
import {EditCardView} from "@/components/cards/EditCard";

export default function Page() {
    const [deck, setDeck] = useState<Deck | null>(null)
    const [learnModi, setLearnModi] = useState<boolean>(false)
    const [showAddCard, setShowAddCard] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false)
    const [newCard, setNewCard] = useState<Card>({question: "", answer: "", performance: "", lastLearned: new Date()})
    const params = useParams<{ deckId: string }>()
    const addCardRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            getDeckById(token, params.deckId).then((deck) => {
                setDeck(deck)
                console.log(deck)
            })
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (addCardRef.current && !addCardRef.current.contains(event.target as Node)) {
                setShowAddCard(false);
            }
        };

        if (showAddCard) {
            window.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAddCard]);


    const handleUpdateCard = async (card: Card) => {
        const token = Cookies.get("accessToken");
        if (deck && token) {
            const index = deck.cards.findIndex((e) => e.id === card.id);

            if (index !== -1) {
                const updatedCards = [...deck.cards];
                updatedCards[index] = card;
                const updatedDeck = {...deck, cards: updatedCards};

                setDeck(updatedDeck);

                await updateCard(token, card.id || "", card)
                setShowAddCard(false)
            }
        }
    };

    const handleSaveNewCard = async (card:Card) => {
        const token = Cookies.get("accessToken");
        if (token && deck) {
            const id = new ObjectId()
            await createNewCard(token, {...card, id: id.toString()})
            await addCardsToDeck(token, deck.id, [{...card, id: id.toString()}])
            setDeck({...deck, cards: [...deck.cards, {...card, id: id.toString()}]})
            setShowAddCard(false)
        }
    }

    return (
        <>
            {deck &&
                (learnModi ? (
                    <LearnModus cards={deck.cards} stopLearnModi={() => setLearnModi(false)}
                                updateCard={handleUpdateCard}/>
                ) : (
                    <div className={`relative w-screen flex justify-center h-[85%] group`}>
                        <main
                            className={`w-11/12 flex items-center flex-col mt-4 transition ${
                                showAddCard ? "blur-sm" : ""
                            }`}
                        >
                            <h2 className="text-text-900">{deck.name}</h2>
                            <table className="w-11/12 mt-16 overflow-x-auto">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-900">Frage</th>
                                    <th className="px-4 py-2 text-left text-gray-900">Erfolg</th>
                                    <th className="px-4 py-2 text-left text-gray-900">zuletzt gelernt</th>
                                    <th className="px-4 py-2 text-left text-gray-900"><span
                                        className="material-icons text-black">
edit
</span></th>
                                </tr>
                                </thead>
                                <tbody>
                                {deck.cards.map((card) => (
                                    <tr key={card.id} className="border-b hover:bg-gray-100">
                                        <td className="px-4 py-2 text-gray-900 w-1/2">{card.question}</td>
                                        <td className="px-4 py-2 text-gray-900">{card.performance}</td>
                                        <td className="px-4 py-2 text-gray-900">
                                            {getTimeView(getMinutesBetweenToTimes(new Date(card.lastLearned), new Date()))}
                                        </td>
                                        <td className="px-4 py-2 text-gray-900 w-8">
                                            <button onClick={() => {
                                                setShowAddCard(true)
                                                setNewCard(card)
                                                setEdit(true)
                                            }}><span
                                                className="material-icons text-black">
edit
                                        </span></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                        </main>
                        <button
                            onClick={() => setLearnModi((prevState) => !prevState)}
                            className="absolute top-8 right-8 bg-accent-600 w-28 h-10 rounded-lg"
                        >
                            Learnmodus
                        </button>
                        <button
                            onClick={() => setShowAddCard(!showAddCard)}
                            className="absolute top-8 right-40 bg-accent-600 w-28 h-10 rounded-lg"
                        >
                            hinzufügen
                        </button>

                        {/* Add Card Modal */}
                        {showAddCard && (edit ?
                            <EditCardView ref={addCardRef} card={newCard} saveCard={handleUpdateCard}/> :
                            <EditCardView ref={addCardRef} card={newCard} saveCard={handleSaveNewCard}/>
                        )}
                    </div>
                ))}
        </>
    );
}



