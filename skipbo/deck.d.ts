import { DoublyLinkedList } from "../core/doubly-linked-list";
import { Card } from "./card";
export declare class Deck {
    _cards: DoublyLinkedList<Card>;
    private _canShuffle;
    constructor(cards: Card[]);
    noShuffle(): void;
    drawDeckCards(count: number): Card[];
    getDeckCards(): Card[];
    addCards(...cards: any[]): void;
    shuffle(): void;
    canDraw(count: number): boolean;
    drawDeckCard(): Card;
}
