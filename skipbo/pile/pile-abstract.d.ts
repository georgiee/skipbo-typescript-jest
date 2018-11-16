import { Card } from "../card";
export declare enum PileRole {
    BUILDING = 1,
    DISCARDING = 2
}
export declare abstract class AbstractPile {
    private _cardList;
    private _mode;
    constructor(mode: PileRole);
    abstract canDraw(card: Card): any;
    drawCard(card: Card): Card;
    getMode(): PileRole;
    add(...cards: Card[]): void;
    abstract isFull(): any;
    abstract canPlace(candidate: Card): boolean;
    addCard(card: Card): void;
    getCards(): Card[];
    /**
     * Read the top card value
     */
    readonly top: Card;
    readonly size: number;
    clear(): Card[];
}
