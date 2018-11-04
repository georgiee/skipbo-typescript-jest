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
  const player2: Player = game.createPlayer("Player2");

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

test("throws error if drawing more card than the deck has ", () => {
  expect(() => {
    const game = new Game([Card.One]);
    game.drawDeckCards(2);
  }).toThrowError("Deck not big enough (1), can't draw (2) card");
})

test("can check if  player can draw cards", () => {
  const game = new Game([Card.One]);
    expect(game.canDraw(1)).toBeTruthy();
    expect(game.canDraw(2)).toBeFalsy();
})

test("can reset deck with comnpleted deck cards", () => {
  const game = new Game([Card.One]);
  game.completedDeck = [Card.One, Card.Three, Card.Four];
    
  game.resetDeck();

  expect(game.getDeckCards()).toHaveLength(4);
})

test.skip("deck will be shuffle after reset", () => {
  const game = new Game([Card.One]);
  expect(game.getDeckCards()).toHaveLength(4);
})

describe("Next Turn", () => {
  let player1: Player;
  let player2: Player;

  beforeEach(() => {
    player1 = game.createPlayer("Player1");
    player2 = game.createPlayer("Player2");
  });

  test("returns a player", () => {
    const player = game.nextPlayer();
    expect(player).toBeInstanceOf(Player);
  })
  
  test("makes Player 1 current player on the first call", () => {
    game.nextPlayer();
    expect(game.currentPlayer).toEqual(player1);
  })
  
  test("return following player and returns to current", () => {
    game.nextPlayer(); // Player 1
    expect(game.currentPlayer).toEqual(player1);
    
    game.nextPlayer();// Player 2
    expect(game.currentPlayer).toEqual(player2);
    
    game.nextPlayer();// Player 1
    expect(game.currentPlayer).toEqual(player1);
  })
})

