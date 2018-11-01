import { AbstractPile, PileRole } from "./pile-abstract";

export class DiscardPile extends AbstractPile {
  constructor() {
    super(PileRole.DISCARDING);
  }
}