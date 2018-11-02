import { BuildingPile } from "./building-pile";
import { PileGroup } from "./pile-group";
import { Card } from "../card";

let group: PileGroup;
let pile1: BuildingPile;
let pile2: BuildingPile;

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

test.only("can output an ascii representatipn of the whole group" , () => {
  group.autoPlace(Card.One);
  group.autoPlace(Card.One);
  group.autoPlace(Card.Two);
  group.autoPlace(Card.Three);

  const output = group.display();
  const ascii = `
┌────┐'
│1││1│
│2│
│2│
`;
  expect(output).toBe(ascii);
})