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

// Our automata will let the two players
// play very naively against each other — always choosing the first possible 
// card to build or discard. Such a game really wouldn't be fun 😄 
// This is great during development and works somehow as our integration test. 
const automata = new Automata(game, [player1, player2]);
automata.run();