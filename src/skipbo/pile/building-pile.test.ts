import { PileRole } from "./pile-abstract";
import { Card } from "../card";
import { BuildingPile } from "./building-pile";

let pile: BuildingPile;

// create an array of cards from 1 - 12
const createFullPile = () => Array.from(Array(12))
  .map((value, index) => index + 1)

describe("Building Pile", () => {
  beforeEach(() => {
    pile = new BuildingPile();
  })
  
  test('mode returns building pile pile', () => {
    expect(pile.getMode()).toBe(PileRole.BUILDING);
  })

  test('empty pile return empty top', () => {
    expect(pile.top).toBe(Card.Empty);
  })

  test('can\'t remove any card', () => {
    pile.add(Card.One, Card.Two, Card.Three);

    expect(() => {
      pile.removeTopCard();
    }).toThrowError("You can't remove card from building piles");
  })
  
  test('get all cards', () => {
    pile.add(Card.One);
    pile.add(Card.Two);
    pile.add(Card.Three);
    expect(pile.getCards()).toEqual(expect.arrayContaining([Card.One,Card.Two,Card.Three]));
  })
  
  test('add a card', () => {
    pile.add(Card.One);
    pile.add(Card.Two);
    pile.add(Card.Three);
    expect(pile.top).toBe(Card.Three);
  })
  
  test('can check if a card can be placed on an empty pile', () => {
    expect(pile.canPlace(Card.One)).toBeTruthy();
  })
  
  test('can check if multiple cards can be placed', () => {
    pile.add(Card.One);
    pile.add(Card.Two);
    expect(pile.canPlace(Card.Three)).toBeTruthy();
  })
  
  test('can place SkipBo card anytime', () => {
    pile.add(Card.One);
    pile.add(Card.Two);
    expect(pile.canPlace(Card.SkipBo)).toBeTruthy();
  })
  
  test('added skipbo cards reflects real card value when checked', () => {
    pile.add(Card.One);
    pile.add(Card.Two);
    pile.add(Card.SkipBo);
    expect(pile.top).toBe(Card.Three);
  })
  
  test('throws a specific error if you try to place a wrong card', () => {
    pile.add(Card.One);
    pile.add(Card.Two);
    
    expect(() => {
      pile.add(Card.Four);
    }).toThrowError("You can't place card 4 on 2");
  })
  
  test('can add multiple cards', () => {
    pile.add(Card.One, Card.Two, Card.Three);
    expect(pile.top).toBe(Card.Three);
  })
  
  test('is not full when empty', () => {
    expect(pile.isFull()).toBeFalsy();
  })
  
  test('return true for isFull() when full', () => {
    pile.add(...createFullPile());
    expect(pile.isFull()).toBeTruthy();
  })
  
  test('throws an error if you try to place a card on a full pile', () => {
    pile.add(...createFullPile());
    
    expect(() => {
      pile.add(Card.SkipBo);
    }).toThrowError("You can't place card on a full pile");
  })
  
  test("Can be cleared", () => {
    pile.add(Card.One);
    pile.add(Card.Two);
    
    const cards = pile.clear();
    
    expect(cards).toEqual(expect.arrayContaining([Card.One, Card.Two]));
    expect(pile.size).toBe(0);
  })
})
