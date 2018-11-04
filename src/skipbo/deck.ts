import { DoublyLinkedList } from "../core/doubly-linked-list";
import { Card } from "./card";
import { assert, shuffle } from "../utils";
import { logger } from "./logger";

export class Deck {
  _cards: DoublyLinkedList<Card> = new DoublyLinkedList();
  private _canShuffle: boolean = true;

  constructor(cards: Card[]) {
    this._cards.fromArray(cards);
  }
  
  // just for mocking and being predictable
  // usually this shouldn't be part of the deck implementation 
  noShuffle() {
    this._canShuffle = false;
  }

  drawDeckCards(count: number):Card[] {
    assert(count > 0, "Can't draw less than one card");
    assert(count <= this._cards.size(), `Deck not big enough (${this._cards.size()}), can\'t draw (${count}) card`);
    
    let cards = [];

    while(cards.length < count) {
      
      cards.push(this.drawDeckCard());
    }
    
    return cards;
  }
  
  getDeckCards():Card[] {
    return Array.from(this._cards.values());
  }

  addCards(...cards) {
    // merge with remaining cards of the deck
    const allCards = cards.concat(...this._cards.values());
    console.log('allCards', allCards);
    this._cards.fromArray(allCards);
  }
  
  shuffle() {
    if(this._canShuffle === false) {
      return 
    }
    
    const cards = this.getDeckCards();
    this._cards.fromArray(shuffle(cards));
  }
  
  canDraw(count: number): boolean {
    return count <= this._cards.size();
  }
  
  drawDeckCard(): Card {
    const card = this._cards.pop();
    
    return card;
  }

}