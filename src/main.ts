import { playTurn } from "./skipbo/automata";
import { Game } from "./skipbo/game";
import { logger } from "./skipbo/logger";
import { testdeck } from "./skipbo/testdeck";

logger.enable();

const game = new Game(testdeck);
// game.restart();
// console.log(game.getDeckCards());

//create two players
const player1 = game.createPlayer("Player 1");
const player2 = game.createPlayer("Player 2");

// deal stock cards to every player
game.dealStockCards();

// Start Game

game.cleanup();
playTurn(player1);
playTurn(player2);
playTurn(player1);
playTurn(player2);
playTurn(player1);
playTurn(player2);
playTurn(player1);
playTurn(player2);
playTurn(player1);
playTurn(player2);
playTurn(player1);
playTurn(player2);
playTurn(player1);
playTurn(player2);
playTurn(player1);