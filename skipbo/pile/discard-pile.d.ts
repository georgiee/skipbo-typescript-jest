import { AbstractPile } from "./pile-abstract";
import { Card } from "../card";
export declare class DiscardPile extends AbstractPile {
    constructor();
    isFull(): boolean;
    canDraw(card: Card): boolean;
    canPlace(candidate: Card): boolean;
    clear(): Card[];
}
