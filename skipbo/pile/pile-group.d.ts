import { AbstractPile } from "./pile-abstract";
import { Card } from "../card";
import { BuildingPile } from "./building-pile";
import { DiscardPile } from "./discard-pile";
export declare enum PLACE_STRATEGY {
    FIRST = 0,
    EVENLY = 1
}
export declare class PileGroup {
    _piles: AbstractPile[];
    _placeStrategy: PLACE_STRATEGY;
    constructor(placeStrategy?: PLACE_STRATEGY);
    add(pile: AbstractPile): void;
    getPileCandidates(card: Card): AbstractPile[];
    canPlace(card: Card): boolean;
    getBuildingCards(cards: Card[]): Card[];
    autoPlace(card: Card): BuildingPile | DiscardPile;
    autoPlaceCards(...cards: Card[]): void;
    display(): string;
    print(name: any): void;
    cleanup(): Card[];
    getDrawCandidates(card: Card): AbstractPile[];
    canDraw(card: Card): boolean;
    drawCard(card: Card): Card;
    getTopCards(): Card[];
}
