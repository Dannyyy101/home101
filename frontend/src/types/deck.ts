import {Card} from "@/types/card";

export interface Deck {
    id: string,
    name: string;
    cards: Card[]
}