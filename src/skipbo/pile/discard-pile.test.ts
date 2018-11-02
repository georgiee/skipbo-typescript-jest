import { PileRole } from "./pile-abstract";
import { Card } from "../card";
import { DiscardPile } from "./discard-pile";

let pile: DiscardPile;

// create an array of cards from 1 - 12
const createFullPile = () => Array.from(Array(12))
  .map((value, index) => index + 1)

describe("Discard Pile", () => {
  beforeEach(() => {
    pile = new DiscardPile();
  })
  
  test('mode returns building pile pile', () => {
    expect(pile.getMode()).toBe(PileRole.DISCARDING);
  })
  
  test('is never full', () => {
    pile.add(...createFullPile());
    expect(pile.isFull()).toBeFalsy();
  })

  test('can place any card in any order', () => {
    pile.add(Card.Twelve, Card.Two, Card.SkipBo, Card.Four);
    expect(pile.top).toBe(Card.Four);
  })
  
  test('can remove the top card', () => {
    pile.add(Card.Twelve, Card.Two, Card.SkipBo, Card.Four);

    const card = pile.removeTopCard();
    
    expect(card).toBe(Card.Four);
    expect(pile.top).toBe(Card.Three);
  })
  
  test("Can't be cleared", () => {
    expect(() => {
      pile.clear()
    }).toThrowError("You can't clear a discar pile");
  })
  
});
