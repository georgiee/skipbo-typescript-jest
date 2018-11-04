import { DoublyLinkedList } from "../../core/doubly-linked-list";
import { Card } from "../card";
import { assert } from "../../utils";
import { AbstractPile } from "./pile-abstract";

export enum PileRole {
  BUILDING = 1, DISCARDING
}

export class BuildingPile extends AbstractPile {
  constructor() {
    super(PileRole.BUILDING);
  }
  

  isFull() {
    if(this.getMode() === PileRole.DISCARDING) {
      return false;
    }
    return this.top === Card.Twelve;
  }

  canDraw(card: Card) {
    return false;
  }

  canPlace(candidate: Card):boolean {
    const topCard = this.top;
    
    if(candidate === Card.SkipBo) {
      return true;
    }
    
    return (candidate - topCard) === 1
  }


  addCard(card: Card){
    assert(this.isFull() === false, `You can't place card on a full pile`);
    assert(this.canPlace(card), `You can't place card ${card} on ${this.top}`);

    super.addCard(card);
  }
  
  drawCard(card: Card) {
    assert(false, `You can't remove card from building piles`);
    return null;
  }
}
