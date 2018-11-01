import { Player, HAND_CARD_COUNT } from "./player";
import { Game } from "./game";
import { Card } from "./card";
import { testdeck } from "./testdeck";

let player: Player;
let defaultGame: Game

const createPlayer = (name, game = null) => new Player(name, game || defaultGame);

beforeEach(() => {
  defaultGame = new Game(testdeck);
  player = createPlayer("Player 1");
  player = createPlayer("Player 2");

  defaultGame.dealStockCards();
})

test("can be named", () => {
  const name = 'Some Player';
  player = createPlayer(name);

  expect(player.getName()).toBe(name);
})

test("fills up hand from deck", () => {
  player.fillHand();
  
  expect(player.getHandCards())
    .toEqual(expect.arrayContaining([Card.Five, Card.Ten, Card.SkipBo, Card.Ten, Card.Ten]));
})

test("fills up only difference", () => {
  player.fillHand();
  
  player.drawHandCard(Card.SkipBo);
  player.drawHandCard(Card.Five);
  
  expect(player.getHandCards()).toHaveLength(3);
  
  player.fillHand();
  
  expect(player.getHandCards()).toHaveLength(HAND_CARD_COUNT);
  expect(player.getHandCards())
    .toEqual(expect.arrayContaining([Card.Ten, Card.Ten, Card.Ten, Card.Twelve, Card.SkipBo]));
})

test("can't remove card not on hand", () => {
  player.fillHand();
  const cardNotOnHand = Card.One;

  expect(() => {
    player.drawHandCard(cardNotOnHand);
  }).toThrowError(`Card ${cardNotOnHand} is not your hand.`);
})

test("remove card from hand", () => {
  const cardOnHand = Card.Ten;
  
  player.fillHand();
  const handCardsBefore = player.getHandCards();
  
  player.drawHandCard(cardOnHand);

  const handCardsAfter = player.getHandCards();
  
  expect(handCardsBefore).toHaveLength(HAND_CARD_COUNT);
  expect(handCardsAfter).toHaveLength(HAND_CARD_COUNT - 1);
})

test("get stock cards", () => {
  player.addStockCard(Card.One, Card.Two, Card.Three);
  const stockCards = player.getStockCards();

  expect(stockCards).toHaveLength(3);
})

test("draw stock card", () => {
  const player = new Player("Player", defaultGame);
  player.addStockCard(Card.Twelve, Card.Eleven, Card.Ten);

  const card = player.drawStockCard();
  const stockCards = player.getStockCards();

  expect(card).toBe(Card.Ten);
})


test("get stock card", () => {
  player.addStockCard(Card.One, Card.Two, Card.Three);
  expect(player.currentStockCard).toBe(Card.Three);
})
