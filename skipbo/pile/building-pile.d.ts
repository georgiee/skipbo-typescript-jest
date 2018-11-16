import { Card } from "../card";
import { AbstractPile } from "./pile-abstract";
export declare enum PileRole {
    BUILDING = 1,
    DISCARDING = 2
}
export declare class BuildingPile extends AbstractPile {
    constructor();
    isFull(): boolean;
    canDraw(card: Card): boolean;
    canPlace(candidate: Card): boolean;
    addCard(card: Card): void;
    drawCard(card: Card): any;
}
