import { BuildingPile } from "./pile/building-pile";
import { DoublyLinkedList, DoublyLinkedListNode } from "../core/doubly-linked-list";
import { Card, generateSkipBoCards } from "./card";
import { shuffle, assert } from "../utils";
import { Player } from "./player";
import { PileGroup } from "./pile/pile-group";
import { logger } from "./logger";
import { Deck } from "./deck";

export const STOCK_CARD_COUNT = 30;

// create and shuffle the initial deck
export class Game {
  _deck: Deck;

  // hold all completed building cards
  completedDeck: Card[] = [];
  buildingGroup: PileGroup = new PileGroup();
  
  _currentPlayer: DoublyLinkedListNode<Player>;
  _players: DoublyLinkedList<Player> = new DoublyLinkedList();
  _turnCounter:number = 0;

  constructor(cards: Card[] = null) {
    this._deck = new Deck(cards || generateSkipBoCards());
    // this._deck.shuffle();
    this.buildingGroup.add(new BuildingPile());
    this.buildingGroup.add(new BuildingPile());
    this.buildingGroup.add(new BuildingPile());
    this.buildingGroup.add(new BuildingPile());
  }
  
  get deck () {
    return this._deck;
  }

  getDeckCards():Card[] {
    return this._deck.getDeckCards();
  }

  resetDeck() {
    logger.info('Deck is completed, shuffle back in completed cars', this.completedDeck);
    
    // add back cards from the completed deck and shuffle
    this._deck.addCards(...this.completedDeck);
    this._deck.shuffle();
  }
  
  canDraw(count: number): boolean {
    return this._deck.canDraw(count);
  }
  
  drawDeckCards(count: number):Card[] {
    return this._deck.drawDeckCards(count);
  }
  
  drawDeckCard(): Card {
    return this._deck.drawDeckCard();;
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
    logger.info(`New Player '${player}' Added`, player);

    return player;
  }

  cleanup() {
    const cards = this.buildingGroup.cleanup();

    if(cards.length > 0) {
      logger.info('Cleaned up piles');
    }

    this.completedDeck.push(...cards);
  }
  
  get currentPlayer() {
    return this._currentPlayer.value;
  }
  
  getPlayers() {
    return Array.from(this._players.values());
  }

  nextPlayer() {
    if(!this._currentPlayer) {
      this._currentPlayer = this._players.head;
    }else {
      if(this._currentPlayer.next) {
        this._currentPlayer = this._currentPlayer.next;
      } else{
        this._currentPlayer = this._players.head;
      }
    }
    this._turnCounter ++;
    return this.currentPlayer;
  }

  get turnId() {
    return this._turnCounter;
  }
}