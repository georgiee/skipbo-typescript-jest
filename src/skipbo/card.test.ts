import { generateSkipBoCards, Card } from "./card";

test('generateSkipBoCards creates correct count of SkipBo cards', () => {
    const CardCount = 162;
    const SkipBoCards = 18;

    const cards = generateSkipBoCards();
    const skipboCards = cards.filter(value => value == Card.SkipBo);
    
    expect(cards).toHaveLength(CardCount);
    expect(skipboCards).toHaveLength(SkipBoCards);
})