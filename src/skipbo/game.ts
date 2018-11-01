import { BuildingPile } from "./pile/building-pile";
import { DoublyLinkedList } from "../core/doubly-linked-list";
import { Card, generateSkipBoCards } from "./card";
import { shuffle, assert } from "../utils";
import { Player } from "./player";
import { PileGroup } from "./pile/pile-group";

export const STOCK_CARD_COUNT = 30;

// create and shuffle the initial deck
export class Game {
  deck: DoublyLinkedList<Card> = new DoublyLinkedList();
  buildingGroup: PileGroup = new PileGroup();
  buildingPileOne: BuildingPile = new BuildingPile();
  buildingPileTwo: BuildingPile = new BuildingPile();
  buildingPileThree: BuildingPile = new BuildingPile();
  buildingPileFour: BuildingPile = new BuildingPile();
  

  _players: Player[] = [];

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

    for(let i = 0; i < STOCK_CARD_COUNT; i++) {
      this._players.forEach(player => player.addStockCard(this.drawDeckCard()));
    }
  }

  createPlayer(name: string) {
    const player = new Player(name, this);
    this._players.push(player);

    return player;
  }
}