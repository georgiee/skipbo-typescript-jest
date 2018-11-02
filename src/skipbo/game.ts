import { BuildingPile } from "./pile/building-pile";
import { DoublyLinkedList, DoublyLinkedListNode } from "../core/doubly-linked-list";
import { Card, generateSkipBoCards } from "./card";
import { shuffle, assert } from "../utils";
import { Player } from "./player";
import { PileGroup } from "./pile/pile-group";
import { logger } from "./logger";

export const STOCK_CARD_COUNT = 30;

// create and shuffle the initial deck
export class Game {
  deck: DoublyLinkedList<Card> = new DoublyLinkedList();
  // hold all completed building cards
  completedDeck: Card[] = [];
  buildingGroup: PileGroup = new PileGroup();
  buildingPileOne: BuildingPile = new BuildingPile();
  buildingPileTwo: BuildingPile = new BuildingPile();
  buildingPileThree: BuildingPile = new BuildingPile();
  buildingPileFour: BuildingPile = new BuildingPile();
  
  _currentPlayer: DoublyLinkedListNode<Player>;
  _players: DoublyLinkedList<Player> = new DoublyLinkedList();

  constructor(deck:Card[] = []) {
    this.buildingGroup.add(this.buildingPileOne);
    this.buildingGroup.add(this.buildingPileTwo);
    this.buildingGroup.add(this.buildingPileThree);
    this.buildingGroup.add(this.buildingPileFour);

    if(deck) {
      this.deck.fromArray(deck);
    }
  }

  restart() {
    this.deck.fromArray(shuffle(generateSkipBoCards()));
  }
  
  getDeckCards():Card[] {
    return Array.from(this.deck.values());
  }

  drawDeckCards(count: number):Card[] {
    assert(count > 0, "Can't draw less than one card");
    let cards = [];

    while(cards.length < count) {
      
      cards.push(this.drawDeckCard());
    }
    
    return cards;
  }
  
  drawDeckCard(): Card {
    const card = this.deck.pop();
    
    return card;
  }

  dealStockCards() {
    const players = Array.from(this._players.values());
    
    for(let i = 0; i < STOCK_CARD_COUNT; i++) {
      players.forEach(player => player.addStockCard(this.drawDeckCard()));
    }
    
    logger.group("Dealing stock cards to players");

    players.forEach(player => {
      logger.info(`${player} received ${player.getStockCards().length} stock cards`);
    })
    logger.groupEnd();
  }

  createPlayer(name: string) {
    const player = new Player(name, this);
    this._players.add(player);
    logger.info(`New Player '${player}' Added`);

    return player;
  }

  cleanup() {
    const cards = this.buildingGroup.cleanup();
    this.completedDeck.push(...cards);
  }
  get currentPlayer() {
    return this._currentPlayer.value;
  }
  
  nextTurn() {
    if(!this._currentPlayer) {
      this._currentPlayer = this._players.head;
    }else {
      this._currentPlayer = this._currentPlayer.next;
    }

    return this.currentPlayer;
  }
}