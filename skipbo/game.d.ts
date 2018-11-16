import { DoublyLinkedList, DoublyLinkedListNode } from "../core/doubly-linked-list";
import { Card } from "./card";
import { Player } from "./player";
import { PileGroup } from "./pile/pile-group";
import { Deck } from "./deck";
export declare const STOCK_CARD_COUNT = 30;
export declare class Game {
    _deck: Deck;
    completedDeck: Card[];
    buildingGroup: PileGroup;
    _currentPlayer: DoublyLinkedListNode<Player>;
    _players: DoublyLinkedList<Player>;
    _turnCounter: number;
    constructor(cards?: Card[]);
    readonly deck: Deck;
    getDeckCards(): Card[];
    resetDeck(): void;
    canDraw(count: number): boolean;
    drawDeckCards(count: number): Card[];
    drawDeckCard(): Card;
    dealStockCards(): void;
    createPlayer(name: string): Player;
    cleanup(): void;
    readonly currentPlayer: Player;
    getPlayers(): Player[];
    nextPlayer(): Player;
    readonly turnId: number;
}
