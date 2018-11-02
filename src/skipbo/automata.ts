import { Player } from "./player";
import { logger } from "./logger";
import { BuildingPile } from "./pile/building-pile";
import { Game } from "./game";


function tryStockCard(player) {
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

function tryHandCard(player) {
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
function singleRun(player: Player) {
  const game:Game = player.getGame();
  
  logger.group(`-- Run partial turn`);
  logger.info(`Current Stock Card: `, player.currentStockCard)
  logger.info(`Current Hand: `, player.getHandCards());
  
  let cardPlayed = false;
  
  cardPlayed = tryStockCard(player);
  if(!cardPlayed) {
    cardPlayed = tryHandCard(player);
  }

  logger.groupEnd();
  return cardPlayed;
}

export function playTurn(player: Player) {
  const game: Game = player.getGame();  
  logger.group(`Playing Turn for ${player}`);
  logger.info(game.buildingGroup.display());

  player.fillHand();
  
  while(singleRun(player)) {
    // logger.info('Placed some card, continue turn');
  }

  player.discardHandCard();
  logger.info(game.buildingGroup.display());
  
  logger.groupEnd();
}