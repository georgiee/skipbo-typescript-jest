import { BuildingPile } from "./building-pile";
import { PileGroup } from "./pile-group";
import { Card } from "../card";

let group: PileGroup;
let pile1: BuildingPile;
let pile2: BuildingPile;

// create an array of cards from 1 - 12
const createFullPile = () => Array.from(Array(12))
  .map((value, index) => index + 1)

beforeEach(() => {
  group = new PileGroup();
  group.add(pile1 = new BuildingPile())
  group.add(pile2 = new BuildingPile())
})

test("get possible piles", () => {
  const piles = group.getPileCandidates(Card.One);
  expect(piles).toHaveLength(2);
})

test("has zero piles for impossible card to build", () => {
  const piles = group.getPileCandidates(Card.Two);
  expect(piles).toHaveLength(0);
})

test("throws error when trying to auto-place wrong card" , () => {
  expect(() => {
    group.autoPlace(Card.Two)
  }).toThrowError("Can't auto-place a card not matching building order");
})

test("can auto place on candidate" , () => {
  group.autoPlace(Card.One);
  group.autoPlace(Card.Two);
  group.autoPlace(Card.Three);
  group.autoPlace(Card.One);

  expect(pile1.top).toBe(Card.Three);
  expect(pile2.top).toBe(Card.One);
})

test("can auto place wild card" , () => {
  group.autoPlace(Card.One);
  group.autoPlace(Card.SkipBo);
  group.autoPlace(Card.SkipBo);
  group.autoPlace(Card.SkipBo);

  expect(pile1.top).toBe(Card.Four);
  expect(pile2.top).toBe(Card.Empty);
})

test("can auto place multiple cars" , () => {
  group.autoPlaceCards(Card.One, Card.SkipBo, Card.SkipBo, Card.SkipBo);

  expect(pile1.top).toBe(Card.Four);
  expect(pile2.top).toBe(Card.Empty);
})

test("clears a pile without touching the others" , () => {
  const fullSet = createFullPile();
  group.autoPlaceCards(Card.One);
  group.autoPlaceCards(Card.Two);
  group.autoPlaceCards(Card.Three);
  group.autoPlaceCards(Card.Four);
  group.autoPlaceCards(...fullSet);

  expect(pile1.top).toBe(Card.Twelve);

  group.cleanup();
  expect(pile1.top).toBe(Card.Empty);
  expect(pile2.top).toBe(Card.Four);
})

test("display card as ascii" , () => {
  const fullSet = createFullPile();
  group.autoPlaceCards(Card.One);
  group.autoPlaceCards(...fullSet);
  expect(group.display()).toBe(`1|1
2|░
3|░
4|░
5|░
6|░
7|░
8|░
9|░
10|░
11|░
12|░`);

  expect(pile1.top).toBe(Card.Twelve);
})
