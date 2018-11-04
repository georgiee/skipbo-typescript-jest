import { AbstractPile } from "./pile-abstract";
import { Card } from "../card";
import { assert } from "../../utils";
import { logger } from "../logger";
import { BuildingPile } from "./building-pile";
import { DiscardPile } from "./discard-pile";

export enum PLACE_STRATEGY {
  FIRST, EVENLY
}

function smallestPile(list: AbstractPile[]) {
  const sortedList = list.sort((a:AbstractPile, b:AbstractPile) => a.size - b.size);
  return sortedList[0];
}

function getTargetPile(candidates: AbstractPile[], strategy: PLACE_STRATEGY) {
  // naive, always take the first pile. We could also randomly choose or use the smallest pile first.
  switch(strategy) {
    case PLACE_STRATEGY.EVENLY:
      return smallestPile(candidates);
      break;
    case PLACE_STRATEGY.FIRST:
      return candidates[0]
      break;
  }
  
  throw new Error(`Given place strategy (${strategy}) is unknown`);
}

export class PileGroup {
  _piles:AbstractPile[] = [];
  _placeStrategy: PLACE_STRATEGY;

  constructor(placeStrategy: PLACE_STRATEGY = PLACE_STRATEGY.EVENLY ) {
    this._placeStrategy = placeStrategy;
  }

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

  autoPlace(card: Card): BuildingPile | DiscardPile {
    assert(this.canPlace(card), "Can't auto-place a card not matching building order");
    const candidates = this.getPileCandidates(card);
    let chosenPile: AbstractPile = getTargetPile(candidates, this._placeStrategy);
    
    chosenPile.addCard(card);

    return chosenPile;
  }
  
  

  autoPlaceCards(...cards: Card[]) {
    while(cards.length) {
      this.autoPlace(cards.shift());
    }
  }

  display() {
    
    let allCards = this._piles.map(pile => {
      return pile.getCards();
    })

    // calculate heighest stack 
    const maxStackSize = allCards.reduce(
        (maxStackSize: number, item: Card[]) => Math.max(maxStackSize, item.length), 0);

    const transpose = m => Array.from(Array(maxStackSize)).map((x,i) => m.map(x => {
      return (x[i] === undefined) ? '░' : x[i];
    }))


    let transposed = transpose(allCards);
    transposed = transposed.map(item => item.join('|'));

    return transposed.join('\n');
  }

  print(name) {
    console.group(name);
    console.info(this.display());
    console.groupEnd();
  }

  cleanup() {
    // remove all completed building piles
    let cards: Card[] = [];

    this._piles.forEach(pile => {
      if(pile.isFull()) {
        cards.push(...pile.clear());
      }
    });

    return cards;
  }
  
  getDrawCandidates(card: Card){
    const candidates = this._piles.filter(
      (pile: AbstractPile) => pile.canDraw(card)
    );
    
    return candidates;
  }

  canDraw(card: Card) {
    return this.getDrawCandidates(card).length > 0;
  }

  drawCard(card: Card) {
    const candidates = this.getDrawCandidates(card);
    return candidates[0].drawCard(card);
  }
  
  getTopCards() {
    return this._piles
      .map(pile => pile.top)
      .filter((card: Card) => card !== Card.Empty );
  }
}