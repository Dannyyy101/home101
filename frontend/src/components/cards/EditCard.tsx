import React, { useEffect, useState, forwardRef } from "react";
import { Card } from "@/types/card";

interface CardViewProps {
    card: Card;
    saveCard: (card: Card) => void;
}

export const EditCardView = forwardRef<HTMLDivElement, CardViewProps>(
    ({ card, saveCard }, ref) => {
        const [editCard, setEditCard] = useState<Card | null>(null);

        useEffect(() => {
            setEditCard(card);
        }, [card]);

        if (!editCard) return null;

        return (
            <div
                ref={ref}
                className="p-4 h-96 rounded bg-accent-600 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 flex flex-col"
            >
                <label>Frage</label>
                <textarea
                    value={editCard.question}
                    onChange={e => setEditCard({ ...editCard, question: e.target.value })}
                    className="pl-1 h-40 border-text-50 border bg-transparent resize-none focus:outline-none"
                />
                <label className="mt-2">Antwort</label>
                <textarea
                    onChange={e => setEditCard({ ...editCard, answer: e.target.value })}
                    value={editCard.answer}
                    className="pl-1 h-40 border-text-50 border bg-transparent resize-none focus:outline-none"
                />
                <button
                    onClick={() => saveCard(editCard)}
                    className="w-32 h-12 mt-6 text-text-900 bg-accent-100 rounded-lg"
                >
                    Speichern
                </button>
            </div>
        );
    }
);
