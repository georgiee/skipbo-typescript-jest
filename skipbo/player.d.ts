import { Card } from "./card";
import { DoublyLinkedList } from "../core/doubly-linked-list";
import { Game } from "./game";
import { PileGroup } from "./pile/pile-group";
export declare const HAND_CARD_COUNT = 5;
export declare class Player {
    private _name;
    private _game;
    stockPile: DoublyLinkedList<Card>;
    hand: Card[];
    discardGroup: PileGroup;
    constructor(_name: string, _game: Game);
    getGame(): Game;
    toString(): string;
    addStockCard(...cards: Card[]): void;
    drawStockCard(): Card;
    readonly currentStockCard: Card;
    getName(): string;
    handIsEmpty(): boolean;
    fillHand(): void;
    drawHandCard(card: Card): Card;
    getStockCards(): Card[];
    getHandCards(): any[];
    reset(): void;
    discardHandCard(): Card;
    readonly complete: boolean;
}
