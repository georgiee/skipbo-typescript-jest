import { Player } from "../player";
import { Game } from "../game";
import { getFullTestDeck, getStockCardsPlayer1 } from "./testdeck";

let game: Game;
let player1: Player;
let player2: Player;


describe("normal game", () => {
  beforeEach(() => {
    game = new Game(getFullTestDeck());

    player1 = game.createPlayer("Player 1");
    player2 = game.createPlayer("Player 2");
  })

  test("give 30 stock cards to each player", () => {
    game.dealStockCards();
    
    expect(player1.getStockCards()).toHaveLength(30);
    expect(player2.getStockCards()).toHaveLength(30);
  })
  
  test("given stock cards are interleaved", () => {
    game.dealStockCards();

    const stockCards1 = player1.getStockCards();
    // compare original array of expected testcard (from test factory) with given cards.
    // If it's matching we know it's interleaved as the testdeck was prepared with interleaved card values
    // so we know the expected stock cards now
    expect(stockCards1).toEqual(expect.arrayContaining(getStockCardsPlayer1()));
  })
})