import {Pageable} from "@/types/pageable";
import {Deck} from "@/types/deck";

export const getAllDecks = async (token: string, params?: { searchQuery?: string }) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_SPRING_BOOT_URL}/decks`)
    if (params && params.searchQuery)
        url.searchParams.append("searchQuery", params?.searchQuery)

    const res = await fetch(url.toString(), {
        next: {revalidate: 3600},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json() as Pageable<Deck>;
}

export const getDeckById = async (token: string, deckId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SPRING_BOOT_URL}/decks/${deckId}`, {
        next: {revalidate: 3600},
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await res.json() as Deck;
}