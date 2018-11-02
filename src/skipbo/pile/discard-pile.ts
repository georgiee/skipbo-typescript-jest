import { AbstractPile, PileRole } from "./pile-abstract";
import { Card } from "../card";

export class DiscardPile extends AbstractPile {
  constructor() {
    super(PileRole.DISCARDING);
  }


  isFull() {
    if(this.getMode() === PileRole.DISCARDING) {
      return false;
    }
    return this.top === Card.Twelve;
  }

  canPlace(candidate: Card):boolean {
    // We can always place a card on discarding
    return true;
  }
  
  clear(): Card[] {
    throw new Error("You can't clear a discar pile");
  }
  
}