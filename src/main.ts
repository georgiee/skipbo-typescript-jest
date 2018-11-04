import { Automata } from "./skipbo/automata";
import { Game } from "./skipbo/game";
import { logger } from "./skipbo/logger";
import { getFullTestDeck } from "./skipbo/test/testdeck";

logger.enable();

const game = new Game(getFullTestDeck());

//create two players
const player1 = game.createPlayer("Player 1");
const player2 = game.createPlayer("Player 2");

// deal stock cards to every player
game.dealStockCards();

const automata = new Automata(game, [player1, player2]);
// Start Game

for(let i = 0; i< 100; i++) {
  // automata.playTurn();
}
