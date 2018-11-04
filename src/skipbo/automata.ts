import { Player } from "./player";
import { logger } from "./logger";
import { BuildingPile } from "./pile/building-pile";
import { Game } from "./game";



export class Automata {
  constructor(
    private game: Game,
    private players: Player[])
    { }

  tryStockCard(player) {
    const game:Game = player.getGame();

    const canPlaceStockCard = game.buildingGroup.canPlace(player.currentStockCard);
    logger.info(`Can we place the stock card? `, canPlaceStockCard ? 'YES' : 'NO');


    if(canPlaceStockCard) {
      const pile: BuildingPile = game.buildingGroup.autoPlace(player.drawStockCard());
      logger.info(`Place stock card. Pile has now: ${pile.getCards()}`);
      return true;
    }

    return false;
  }

  tryHandCard(player) {
    const game:Game = player.getGame();

    const handCardsPlayable = game.buildingGroup.getBuildingCards(player.getHandCards());
    const canPlaceHandCard = handCardsPlayable.length > 0;

    logger.info(`Can we place a hand card? `, canPlaceHandCard ? 'YES' : 'NO');
    
    if(canPlaceHandCard) {
      // naive approach: just play the first hand card
      const card = player.drawHandCard(handCardsPlayable[0]);
      logger.info(`Placing card ${card}`);
      game.buildingGroup.autoPlace(card);
      return true;
    }

    return false;
  }

  singleRun(player: Player) {
      const game:Game = player.getGame();
      
      logger.info(`-- Run partial turn`);
      logger.group(`Stats`);
      logger.info('Hand Cards:', player.getHandCards());
      
      logger.group(`Current Stock Card: ${player.currentStockCard} (${player.getStockCards().length} remaining)`)
      logger.info('Stock Card Count:', player.getStockCards().length);
      logger.info('Stock Cards:', player.getStockCards());
      logger.groupEnd();

      logger.info('');

      player.discardGroup.print('Discard Group');
      game.buildingGroup.print('Building Group');

      logger.groupEnd();
    
      
      let cardPlayed = false;
      
      cardPlayed = this.tryStockCard(player);

      if(!cardPlayed) {
        cardPlayed = this.tryHandCard(player);
      }
      
      if(cardPlayed && player.handIsEmpty()) {
        console.log('refill no hand cards left and still in turn')
        player.fillHand();
      }

      // logger.groupEnd();
      return cardPlayed;
  }
  
  playTurn() {
    const player: Player = this.game.nextPlayer();
  
    logger.group(`Playing Turn for ${player}`);
  
    player.fillHand();
    
    while(this.singleRun(player)) {
      this.game.cleanup();
    }
    
    //always discard a card to complete the turn
    const discardedCard = player.discardHandCard();
    console.info(`Discard Card ${discardedCard}`);
    
    logger.groupEnd();
  }
}