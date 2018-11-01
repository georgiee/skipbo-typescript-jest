import { BuildingPile } from "./building-pile";
import { AbstractPile } from "./pile-abstract";
import { Card } from "../card";
import { assert } from "../../utils";

export class PileGroup {
  _piles:AbstractPile[] = []

  add(pile: AbstractPile) {
    this._piles.push(pile);
  }
  
  getPileCandidates(card: Card) {
    const candidates = this._piles.filter(
      (pile: AbstractPile) => pile.canPlace(card)
    );
    
    return candidates;
  }
  
  canPlace(...cards: Card[]) {
    return this.getBuildingCards(cards).length > 0;
  }
  
  getBuildingCards(cards: Card[]): Card[] {
    const candidateCards = cards.filter(card => this.canPlace(card));
    return candidateCards;
  }

  autoPlace(card: Card) {
    assert(this.canPlace(card), "Can't auto-place a card not matching building order");
    const candidates = this.getPileCandidates(card);
    const firstPile = candidates[0];
    firstPile.addCard(card);
  }
}