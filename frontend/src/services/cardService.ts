import {Card} from "@/types/card";

export const createNewCard = async (token: string, card: Card) => {
    await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_URL}/cards`, {
        next: {revalidate: 3600},
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    });
}

export const updateCard = async (token: string, cardId: string, card: Card) => {
    await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_URL}/cards/${cardId}`, {
        next: {revalidate: 3600},
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    });
}