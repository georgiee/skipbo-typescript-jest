import { interleaveArrays } from "../../utils";

// Create a deck we know so we can test it properly
const remainingDeck = [6, 11, 4, 12, 1, 3, 10, 6, -1, 7, 5, 2, 11, 2, 10, 12, 5, 12, 8, -1, -1, 5, 5, 8, 11, 11, 6, 5, 11, 8, -1, 9, 3, 3, 9, 3, 7, 2, 2, 8, 4, 2, -1, 12, -1, 10, 7, 4, 9, 1, 6, 7, 6, 7, 4, 12, 6, 10, 6, 9, 4, 10, 1, 10, 2, -1, 1, 7, 6, 3, -1, 5, 9, 6, 12, 11, 12, 2, 1, 1, 4, 5, 11, 4, 10, 4, 3, 4, 8, 8, 5, -1, 7, 8, 1, 2, 7, 6, 11, 8, 9, 1]

const stockCardsPlayer1 = [5, -1, 10, -1, 6, 3, 9, 2, 7, 3, 12, 11, 2, 8, 5, 11, 3, 2, 9, -1, 1, 10, 5, 2, -1, 3, 1, 1, 5, -1];
const stockCardsPlayer2 =  [10, 10, 12, 3, 1, -1, 9, 4, 9, 4, 7, 4, 8, 11, 12, 12, -1, 10, 12, 7, 7, 8, 8, 9, 6, 3, -1, 11, -1, 9];


export function getStockCardsPlayer1() {
  return stockCardsPlayer1;
}

export function getStockCardsPlayer2() {
  return stockCardsPlayer2;
}

export function getRemainingDeck() {
  return remainingDeck;
}


export const testdeckLegacy = [
  6, 11, 4, 12, 1, 3, 10, 6, -1, 7, 5, 2, 11, 2, 10, 12, 5, 12, 8, -1, -1, 5, 5, 8, 11, 11, 6, 5, 11, 8, -1, 9, 3, 3, 9, 3, 7, 2, 2, 8, 4, 2, -1, 12, -1, 10, 7, 4, 9, 1, 6, 7, 6, 7, 4, 12, 6, 10, 6, 9, 4, 10, 1, 10, 2, -1, 1, 7, 6, 3, -1, 5, 9, 6, 12, 11, 12, 2, 1, 1, 4, 5, 11, 4, 10, 4, 3, 4, 8, 8, 5, -1, 7, 8, 1, 2, 7, 6, 11, 8, 9, 1, 9, -1, -1, 5, 11, 1, -1, 1, 3, 3, 6, -1, 9, 2, 8, 5, 8, 10, 7, 1, 7, -1, 12, 9, 10, 2, -1, 3, 12, 11, 12, 5, 11, 8, 8, 2, 4, 11, 7, 12, 4, 3, 9, 7, 4, 2, 9, 9, -1, 3, 1, 6, 3, -1, 12, 10, 10, -1, 10, 5
]


export function getFullTestDeck() {
  // return testdeckLegacy
  const stockCards = interleaveArrays(stockCardsPlayer1, stockCardsPlayer2).reverse();

  return [
    ...remainingDeck,
    ...stockCards
  ]
}