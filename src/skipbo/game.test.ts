import { Game } from "./game";
import { Player } from "./player";
import { Card } from "./card";
import { testdeck } from "./testdeck";
let game: Game;


beforeEach(() => {
  game = new Game(testdeck);
})

test("can add players", () => {
  const player: Player = game.createPlayer("Player1");
  expect(player).toBeInstanceOf(Player);
})

test("deal stock cards", () => {
  const player1: Player = game.createPlayer("Player1");
  const player2: Player = game.createPlayer("Player1");

  game.dealStockCards();

  expect(player1.getStockCards()).toHaveLength(30);
  expect(player2.getStockCards()).toHaveLength(30);
})

test("draws cards from deck", () => {
  const count = 5;
  const cards:Card[] = game.drawDeckCards(count);

  expect(cards)
  .toEqual(expect.arrayContaining([Card.Five, Card.Ten, Card.SkipBo, Card.Ten, Card.Ten]));
})

test("throws error if drawing less than one card ", () => {
  expect(() => {
    game.drawDeckCards(0);
  }).toThrowError("Can't draw less than one card");
})

test("throws error if drawing less than one card ", () => {
  expect(() => {
    game.drawDeckCards(0);
  }).toThrowError("Can't draw less than one card");
})

test("nextTurn returns a player", () => {
  const player = game.nextTurn();
  expect(player).toBeInstanceOf(Player);
})
