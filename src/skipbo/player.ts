import { Card } from "./card";
import { DiscardPile } from "./pile/discard-pile";
import { DoublyLinkedList } from "../core/doubly-linked-list";
import { Game } from "./game";
import { assert } from "../utils";

export const HAND_CARD_COUNT = 5;

export class Player {
  stockPile:DoublyLinkedList<Card> = new DoublyLinkedList();
  hand: Card[];

  discardPileOne: DiscardPile;
  discardPileTwo: DiscardPile;
  discardPileThree: DiscardPile;
  discardPileFour: DiscardPile;
  
  constructor(
    private _name: string,
    private _game: Game
  ){
    this.reset();
  }
  
  addStockCard(...cards: Card[]) {
    while(cards.length) {
      this.stockPile.add(cards.shift());
    }
  }
  
  drawStockCard() {
    return this.stockPile.pop();
  }
  
  get currentStockCard() {
    if(this.stockPile.size() === 0) {
      return null;
    }

    return this.stockPile.tail.value;
  }

  getName() {
    return this._name;
  }
  
  fillHand() {
    const delta = HAND_CARD_COUNT - this.hand.length 
    const cards = this._game.drawDeckCards(delta);
    
    this.hand.push(...cards);
  }

  drawHandCard(card: Card) {
    assert(this.hand.indexOf(card) !== -1, `Card ${card} is not your hand.`);
    const index = this.hand.indexOf(card);
    this.hand.splice(index, 1);

    return card;
  }
  
  getStockCards() {
    return Array.from(this.stockPile.values());
  }
  
  getHandCards() {
    return [].concat(this.hand);
  }

  reset() {
    this.stockPile = new DoublyLinkedList();
    this.hand = [];

    this.discardPileOne = new DiscardPile();
    this.discardPileTwo = new DiscardPile();
    this.discardPileThree = new DiscardPile();
    this.discardPileFour = new DiscardPile();
  }
}
