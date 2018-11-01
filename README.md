# Skip Bo in JS

npm init --yes
yarn add typescript
tsc --init

## AI
https://github.com/rsms/js-lru
https://github.com/7imon7ays/concentration-js/blob/master/js/dev/concentration.js

## Actions
shuffle deck

A Player Turn
+ Refill hands with 5 cards
+ try stock pile -> building pile
+ try discard pile -> building pile
+ immediately refill if no hand cards left
+ complete turn by discarding a card (no refill if cards are zero)
+ win if stock pile empty

-> next player, next turn

## Rules
// 144 1-12 cards  + 18 Joker/Wild (Skip-bo) = 162 cards
// empty stock pile to win.
// draw pile in center
// 4 building piles in the center
// 4 discard piles per player

// 2 -4 players: 30 cards per player -> stock pile
// 5 or more: 20 cards per player dealt -> stock pile
// face down

// 1. shuffle deck

// 12 cards per face
