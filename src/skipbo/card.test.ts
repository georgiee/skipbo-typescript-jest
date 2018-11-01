import { generateSkipBoCards, Card, cardFollows } from "./card";

test('generateSkipBoCards creates correct count of SkipBo cards', () => {
    const CardCount = 162;
    const SkipBoCards = 18;

    const cards = generateSkipBoCards();
    const skipboCards = cards.filter(value => value == Card.SkipBo);
    
    expect(cards).toHaveLength(CardCount);
    expect(skipboCards).toHaveLength(SkipBoCards);
})


// test('card can follow cards', () => {
//     expect(cardFollows(Card.Empty, Card.One)).toBeTruthy();
//     expect(cardFollows(Card.One, Card.Two)).toBeTruthy();
//     expect(cardFollows(Card.Two, Card.Three)).toBeTruthy();
//     expect(cardFollows(Card.Three, Card.Four)).toBeTruthy();
//     expect(cardFollows(Card.Four, Card.Five)).toBeTruthy();
//     expect(cardFollows(Card.Five, Card.Six)).toBeTruthy();
//     expect(cardFollows(Card.Six, Card.Seven)).toBeTruthy();
//     expect(cardFollows(Card.Seven, Card.Eight)).toBeTruthy();
//     expect(cardFollows(Card.Eight, Card.Nine)).toBeTruthy();
//     expect(cardFollows(Card.Nine, Card.Ten)).toBeTruthy();
//     expect(cardFollows(Card.Ten, Card.Eleven)).toBeTruthy();
//     expect(cardFollows(Card.Eleven, Card.Twelve)).toBeTruthy();
// })

// test("card can't follow cards", () => {
//     expect(cardFollows(Card.Empty, Card.Three)).toBeFalsy();
//     expect(cardFollows(Card.One, Card.Three)).toBeFalsy();
//     expect(cardFollows(Card.Twelve, Card.One)).toBeFalsy();
// })

// test("skipbo can be placed on any card", () => {
//     expect(cardFollows(Card.Empty, Card.SkipBo)).toBeTruthy();
//     expect(cardFollows(Card.Six, Card.SkipBo)).toBeTruthy();
//     expect(cardFollows(Card.Eleven, Card.SkipBo)).toBeTruthy();
//     expect(cardFollows(Card.Twelve, Card.SkipBo)).toBeFalsy();
// })