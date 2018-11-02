import { BuildingPile } from "./building-pile";
import { AbstractPile } from "./pile-abstract";
import { Card } from "../card";
import { assert } from "../../utils";
import { logger } from "../logger";

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
  
  canPlace(card: Card) {
    return this.getPileCandidates(card).length > 0;
  }
  
  getBuildingCards(cards: Card[]): Card[] {
    const candidateCards = cards.filter(card => this.canPlace(card));
    return candidateCards;
  }

  autoPlace(card: Card): BuildingPile {
    assert(this.canPlace(card), "Can't auto-place a card not matching building order");
    const candidates = this.getPileCandidates(card);
    
    // naive, always take the first pile. We could also randomly choose or use the smallest pile first.
    const firstPile = candidates[0];
    firstPile.addCard(card);

    return firstPile;
  }

  display() {
    const transpose = m => m[0].map((x,i) => m.map(x => {
      return (x[i] === undefined) ? '░' : x[i];
    }))
    
    let allCards = this._piles.map(pile => {
      return pile.getCards();
    })
    
    if( allCards[0].length === 0 ) {
      allCards[0]= <any>['░'];
    }
    let transposed = transpose(allCards);
    transposed = transposed.map(item => item.join('|'));
    transposed = transposed.join('\n');
    return transposed;
  }

}