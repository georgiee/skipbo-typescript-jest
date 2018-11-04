import { Player } from "../player";
import { Game } from "../game";
import { getFullTestDeck } from "./testdeck";

let game: Game;
let player1: Player;
let player2: Player;


describe("normal game", () => {
  beforeEach(() => {
    game = new Game(getFullTestDeck());

    player1 = game.createPlayer("Player 1");
    player2 = game.createPlayer("Player 2");
  })

  test("give stock cards all players", () => {
    game.dealStockCards();
    
    expect(player1.getStockCards()).toHaveLength(30);
    expect(player2.getStockCards()).toHaveLength(30);
  })
  
  test("stock cards all players", () => {
    game.dealStockCards();
    expect(player1.getStockCards()).toHaveLength(30);
    expect(player2.getStockCards()).toHaveLength(30);
  })
})