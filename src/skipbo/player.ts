import { Card } from "./card";
import { DiscardPile } from "./pile/discard-pile";
import { DoublyLinkedList } from "../core/doubly-linked-list";
import { Game } from "./game";
import { assert } from "../utils";
import { logger } from "./logger";
import { PileGroup } from "./pile/pile-group";

export const HAND_CARD_COUNT = 5;

export class Player {
  stockPile:DoublyLinkedList<Card> = new DoublyLinkedList();
  hand: Card[];

  discardGroup: PileGroup = new PileGroup();

  constructor(
    private _name: string,
    private _game: Game
  ){
    this.discardGroup.add(new DiscardPile());
    this.discardGroup.add(new DiscardPile());
    this.discardGroup.add(new DiscardPile());
    this.discardGroup.add(new DiscardPile());

    this.reset();
  }
  
  getGame() {
    return this._game;
  }

  toString() {
    return this.getName();
  }
  
  addStockCard(...cards: Card[]) {
    while(cards.length) {
      this.stockPile.add(cards.shift());
    }
  }
  
  drawStockCard() {
    logger.info('Drawing Stock Card');
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
  
  handIsEmpty() {
    return this.hand.length === 0;
  }

  fillHand() {
    const delta = HAND_CARD_COUNT - this.hand.length;
    logger.info(`Drawing ${delta} cards`);
    
    if(!this._game.canDraw(delta)) {
      // shuffle completed decks back in
      this._game.resetDeck();
    }
    
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
  }

  discardHandCard() {
    // draw first hand card
    const card: Card = this.drawHandCard(this.hand[0]);
    this.discardGroup.autoPlace(card);

    return card;
  }

  get complete() {
    return this.stockPile.size() === 0;
  }
}
