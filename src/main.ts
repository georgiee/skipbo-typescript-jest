import { generateSkipBoCards, Card } from "./skipbo/card";
import { shuffle } from "./utils";
import { DoublyLinkedList } from "./core/doubly-linked-list";
import { DiscardPile } from "./skipbo/pile/discard-pile";
import { BuildingPile } from "./skipbo/pile/building-pile";
import { Player } from "./skipbo/player";
import { Game } from "./skipbo/game";

const PLAYER_HAND_COUNT = 5;
const PLAYER_STOCK_PILE_COUNT = 30;

console.log('test');

function dealStockPiles(stockPile:DoublyLinkedList<Card>, deck) {
  while(stockPile.size() < PLAYER_STOCK_PILE_COUNT) {
    stockPile.add(deck.pop());
  }
}

function fillHand(hand: Card[], deck: DoublyLinkedList<Card>) {
  while(hand.length < PLAYER_HAND_COUNT) {
    hand.push(deck.pop());
  }
}

const game = new Game();
game.restart();
console.log(game.getDeckCards());

//create two players
const player1 = game.createPlayer("Player 1");
const player2 = game.createPlayer("Player 2");

// first deal all stock piles
dealStockPiles(player1.stockPile, game.deck);
dealStockPiles(player2.stockPile, game.deck);

console.log(player1, player2);
console.log(game.deck);

// First round, Player 1 starts and draws 5 cards
player1.fillHand();

function canBuildCard() {
  // loop and check:
  // 1. cna place stock card?
  // 2. can place discard card? 

  // const pile: BuildingPile = game.getMatchingPiles(Card.One);
  // pile.add(player.remove(Card.One));
}

