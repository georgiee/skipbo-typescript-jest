import { DoublyLinkedList } from "../../core/doubly-linked-list";
import { Card } from "../card";
import { assert } from "../../utils";

export enum PileRole {
  BUILDING = 1, DISCARDING
}

export class AbstractPile {
  private _cardList: DoublyLinkedList<Card>;
  private _mode: PileRole;

  constructor(mode: PileRole) {
    assert(mode, "You need to specify the mode of this pile");
    this._mode = mode;
    this._cardList = new DoublyLinkedList([]);
  }
  
  removeTopCard() {
    if(this.getMode() === PileRole.BUILDING) {
      console.log('should fail')
      assert(false, `You can't remove card from building piles`);
    }
    
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

  isFull() {
    if(this.getMode() === PileRole.DISCARDING) {
      return false;
    }
    return this.top === Card.Twelve;
  }
  
  addCard(card){
    if(this.getMode() === PileRole.BUILDING) {
      assert(this.isFull() === false, `You can't place card on a full pile`);
      assert(this.canPlace(card), `You can't place card ${card} on ${this.top}`);
    }

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

  canPlace(candidate: Card):boolean {
    // We can always place a card on discarding
    if(this.getMode() === PileRole.DISCARDING) {
      return true;
    }

    const topCard = this.top;
    
    if(candidate === Card.SkipBo) {
      return true;
    }
    
    return (candidate - topCard) === 1
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
  
}
