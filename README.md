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