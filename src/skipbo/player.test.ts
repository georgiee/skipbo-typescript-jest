import { Player, HAND_CARD_COUNT } from "./player";
import { Game } from "./game";
import { Card } from "./card";
import { getFullTestDeck } from "./test/testdeck";

let player1: Player;
let player2: Player;
let defaultGame: Game

const createPlayer = (name, game = null) => new Player(name, game || defaultGame);

beforeEach(() => {
  defaultGame = new Game(getFullTestDeck());
  player1 = createPlayer("Player 1");
  player1 = createPlayer("Player 2");

  defaultGame.dealStockCards();
})

test("can be named", () => {
  const name = 'Some Player';
  player1 = createPlayer(name);

  expect(player1.getName()).toBe(name);
})

test("fills up hand from deck", () => {
  player1.fillHand();
  
  expect(player1.getHandCards())
    .toEqual(expect.arrayContaining([Card.Five, Card.Ten, Card.SkipBo, Card.Ten, Card.Ten]));
})

test("handIsEmpty return true when empty", () => {
  expect(player1.handIsEmpty()).toBeTruthy();
  player1.fillHand();
  expect(player1.handIsEmpty()).toBeFalsy();
})

test("trigger deck reset when deck is not full enough", () => {
  const game = new Game([Card.One]);
  game.completedDeck = [Card.One, Card.One, Card.One, Card.One, Card.Four];

  const testplayer = createPlayer('Testplayer', game);
  
  testplayer.fillHand();
  
  expect(testplayer.getHandCards()).toHaveLength(5);
})

test("fills up only difference", () => {
  player1.fillHand();
  
  player1.drawHandCard(Card.SkipBo);
  player1.drawHandCard(Card.Five);
  
  expect(player1.getHandCards()).toHaveLength(3);
  
  player1.fillHand();
  
  expect(player1.getHandCards()).toHaveLength(HAND_CARD_COUNT);
  expect(player1.getHandCards())
    .toEqual(expect.arrayContaining([Card.Ten, Card.Ten, Card.Ten, Card.Twelve, Card.SkipBo]));
})

test("remove card from hand", () => {
  const cardOnHand = Card.Ten;
  
  player1.fillHand();
  const handCardsBefore = player1.getHandCards();
  
  player1.drawHandCard(cardOnHand);

  const handCardsAfter = player1.getHandCards();
  
  expect(handCardsBefore).toHaveLength(HAND_CARD_COUNT);
  expect(handCardsAfter).toHaveLength(HAND_CARD_COUNT - 1);
})

test("get stock cards", () => {
  player1.addStockCard(Card.One, Card.Two, Card.Three);
  const stockCards = player1.getStockCards();

  expect(stockCards).toHaveLength(3);
})

test("draw stock card", () => {
  const player1 = new Player("Player", defaultGame);
  player1.addStockCard(Card.Twelve, Card.Eleven, Card.Ten);

  const card = player1.drawStockCard();
  const stockCards = player1.getStockCards();

  expect(card).toBe(Card.Ten);
})


test("get stock card", () => {
  player1.addStockCard(Card.One, Card.Two, Card.Three);
  expect(player1.currentStockCard).toBe(Card.Three);
})

test("can discard a hand card", () => {
  player1.fillHand();

  const handCardsBefore = player1.getHandCards();
  player1.discardHandCard();
  
  const handCardsAfter = player1.getHandCards();
  expect(handCardsBefore.length - 1).toBe(handCardsAfter.length);
})

