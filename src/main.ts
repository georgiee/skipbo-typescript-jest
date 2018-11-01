import { generateSkipBoCards, Card } from "./skipbo/card";
import { shuffle } from "./utils";
import { DoublyLinkedList } from "./core/doubly-linked-list";

const PLAYER_HAND_COUNT = 5;
const PLAYER_STOCK_PILE_COUNT = 30;

console.log('test');

// create and shuffle the initial deck
class Game {
  deck: DoublyLinkedList<Card>;
  buildingPileOne: DoublyLinkedList<Card>;
  buildingPileTwo: DoublyLinkedList<Card>;
  buildingPileThree: DoublyLinkedList<Card>;
  buildingPileFour: DoublyLinkedList<Card>;
  
  constructor() {
    this.reset();
  }
  
  reset() {
    this.deck = new DoublyLinkedList();

    this.buildingPileOne = new DoublyLinkedList();
    this.buildingPileTwo = new DoublyLinkedList();
    this.buildingPileThree = new DoublyLinkedList();
    this.buildingPileFour = new DoublyLinkedList();
  }

  shuffle() {
    this.deck.fromArray(shuffle(generateSkipBoCards()));
  }
}

class Player {
  stockPile:DoublyLinkedList<Card>;
  hand: Card[];

  discardPileOne: DoublyLinkedList<Card>;
  discardPileTwo: DoublyLinkedList<Card>;
  discardPileThree: DoublyLinkedList<Card>;
  discardPileFour: DoublyLinkedList<Card>;
  
  constructor(
    public name: string
  ){
    this.reset();
  }
  
  reset() {
    this.stockPile = new DoublyLinkedList();
    this.hand = [];

    this.discardPileOne = new DoublyLinkedList();
    this.discardPileTwo = new DoublyLinkedList();
    this.discardPileThree = new DoublyLinkedList();
    this.discardPileFour = new DoublyLinkedList();
  }
}


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
game.shuffle();

//create two players
const player1 = new Player("Player 1");
const player2 = new Player("Player w");


// first deal all stock piles
dealStockPiles(player1.stockPile, game.deck);
dealStockPiles(player2.stockPile, game.deck);

console.log(player1, player2);
console.log(game.deck);

// First round, Player 1 starts and draws 5 cards
fillHand(player1.hand, game.deck);
console.log(player1.hand, player1.stockPile);


console.log()

