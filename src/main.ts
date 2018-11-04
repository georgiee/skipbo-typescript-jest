import { Automata } from "./skipbo/automata";
import { Game } from "./skipbo/game";
import { logger } from "./skipbo/logger";
import { getFullTestDeck, getFailingDeck } from "./skipbo/test/testdeck";
import { Deck } from "./skipbo/deck";

logger.enable();

// use a prepared testdeck and disable shuffle so we can always get the same result
// useful during development. Fill always finish in round #73 with Player 1 winning.
function createPredictableGame() {
  const game = new Game(getFullTestDeck());
  game.deck.noShuffle();

  return game;
}

// fully random game, will create the correct Skip Bo Deck internally
function createGame() {
  const game = new Game();
  game.deck.shuffle();
  return game;
}

// create failing game, running out of cards
// to reproduce: use the default set and disable shuffle
function createFailingGame() {
  const game = new Game(getFailingDeck());
  game.deck.noShuffle();
  return game;
}

// let game = createPredictableGame();
let game =  createGame();

//create two players
const player1 = game.createPlayer("Player 1");
const player2 = game.createPlayer("Player 2");
const player3 = game.createPlayer("Player 3");
const player4 = game.createPlayer("Player 4");

// Our automata will let the two players
// play very naively against each other — always choosing the first possible 
// card to build or discard. Such a game really wouldn't be fun 😄 
// This is great during development and works somehow as our integration test. 
const automata = new Automata(game);

// let's provide our testdeck to get 
// automata.setDeck(getFullTestDeck());
automata.run();