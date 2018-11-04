import { DoublyLinkedList } from "../../core/doubly-linked-list";
import { Card } from "../card";
import { assert } from "../../utils";

export enum PileRole {
  BUILDING = 1, DISCARDING
}

export abstract class AbstractPile {
  private _cardList: DoublyLinkedList<Card>;
  private _mode: PileRole;

  constructor(mode: PileRole) {
    assert(mode, "You need to specify the mode of this pile");
    this._mode = mode;
    this._cardList = new DoublyLinkedList([]);
  }
  
  public abstract canDraw(card: Card);

  drawCard(card: Card):Card {
    assert(this.canDraw(card), `Can't draw card ${card}`)
    return this._cardList.pop();
  }

  getMode() {
    return this._mode;
  }

  add(...cards:Card[]) {
    while(cards.length){
      this.addCard(cards.shift());
    }
  }

  public abstract isFull();
  public abstract canPlace(candidate: Card):boolean;
  
  public addCard(card: Card) {
    if(card === Card.SkipBo) {
      // Never add SkipBo cards, replace with value it reflects (current card + 1)
      // this makes it much easier to handle the pile
      let mimicCard = this.top + 1;
      this._cardList.add(mimicCard);
    } else {
      this._cardList.add(card);
    }
  }
  
  getCards() {
    return Array.from(this._cardList.values());
  }
  
  /**
   * Read the top card value
   */
  get top():Card {
    if(this._cardList.size() === 0) {
      return Card.Empty;
    }

    const card = this._cardList.tail.value;
    return this._cardList.tail.value;
  }

  get size(): number {
    return this._cardList.size();
  }
  
  clear(): Card[] {
    const cards = this.getCards();
    this._cardList.reset();
    
    return cards;
  }
}
