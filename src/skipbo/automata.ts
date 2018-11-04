import { Player } from "./player";
import { logger } from "./logger";
import { BuildingPile } from "./pile/building-pile";
import { Game } from "./game";
import { Card } from "./card";



export class Automata {
  private _gameOver = false;

  constructor(
    private game: Game,
    private players: Player[])
    { }

  tryStockCard() {
    const player = this.currentPlayer;
    const canPlaceStockCard = this.game.buildingGroup.canPlace(player.currentStockCard);
    let cardPlaced: Card = null;

    if(canPlaceStockCard) {
      cardPlaced = player.drawStockCard()
      this.game.buildingGroup.autoPlace(cardPlaced);
    }

    logger.info(`Can we place the stock card? `, canPlaceStockCard ? `YES (${cardPlaced})` : 'NO');

    return canPlaceStockCard;
  }

  tryHandCard() {
    const player = this.currentPlayer;

    const handCardsPlayable = this.game.buildingGroup.getBuildingCards(player.getHandCards());
    const canPlaceHandCard = handCardsPlayable.length > 0;
    let cardPlaced: Card = null;
    
    if(canPlaceHandCard) {
      // naive approach: just play the first hand card
      cardPlaced = player.drawHandCard(handCardsPlayable[0]);
      this.game.buildingGroup.autoPlace(cardPlaced);
    }


    logger.info(`Can we place a hand card? `, canPlaceHandCard ? `YES (${cardPlaced})` : 'NO');
    
    
    return canPlaceHandCard;
  }

  tryDiscardPile() {
    const player = this.currentPlayer;

    const cards = player.discardGroup.getTopCards();
    const firstPlaceableCard = cards.find(card => this.game.buildingGroup.canPlace(card));
    const canPlaceCard = firstPlaceableCard!== undefined;
    let cardPlaced: Card = null;

    if(player.discardGroup.canDraw(firstPlaceableCard)) {
      cardPlaced = player.discardGroup.drawCard(firstPlaceableCard);
      this.game.buildingGroup.autoPlace(cardPlaced) as BuildingPile;
    }

    logger.info(`Can we place a discard card? `, canPlaceCard ? `YES (${cardPlaced})` : 'NO');

    return canPlaceCard;
  }

  singleRun() {
    const player = this.currentPlayer;
    logger.group(`-- Run partial turn`);
    logger.info('Hand Cards:', player.getHandCards());
    
    logger.group(`Current Stock Card: ${player.currentStockCard} (${player.getStockCards().length} remaining)`)
    logger.info('Stock Card Count:', player.getStockCards().length);
    logger.info('Stock Cards:', player.getStockCards());
    logger.groupEnd();

    logger.info('');

    player.discardGroup.print('Discard Group');
    this.game.buildingGroup.print('Building Group');

  
    
    let cardPlayed = false;
    
    cardPlayed = this.tryStockCard();

    if(!cardPlayed) {
      cardPlayed = this.tryHandCard();
    }
    
    if(!cardPlayed) {
      cardPlayed = this.tryDiscardPile();
    }
    
    // this is allowed durign a turn not as an effect of discarding a card
    if(cardPlayed && player.handIsEmpty()) {
      logger.info('Refill Hand Cards')
      player.fillHand();
    }
    
    logger.groupEnd();

    this.checkWinner();
    
    return cardPlayed;
  }
  
  playTurn() {
    const player: Player = this.game.nextPlayer();
  
    logger.groupCollapsed(`Playing Turn for ${player} round #${this.game.turnId}`);
  
    player.fillHand();
    
    while(this.singleRun()) {
      this.game.cleanup();
    }
    
    //always discard a card to complete the turn
    const discardedCard = player.discardHandCard();
    console.info(`Discard Card ${discardedCard}`);
    console.info(`Turn completed`);
    logger.groupEnd();  

    this.checkWinner();

  }
  
  get currentPlayer(){
    return this.game.currentPlayer;
  }

  getWinner(): Player {
    return this.game.getPlayers().find(player => player.complete);
  }
  
  gameCompleted(): Boolean {
    return this.getWinner() !== undefined;
  }

  
  checkWinner() {
    if(this.gameCompleted()) {
      const winner = this.getWinner();
      this._gameOver = true;
      logger.info(`Game Completed, Winner is ${winner.getName()}`);
    }
  }
  
  run(){
    for(let i = 0; i< 100 && this._gameOver !== true; i++) {
      this.playTurn();
    }
  }
}