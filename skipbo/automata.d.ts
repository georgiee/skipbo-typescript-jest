import { Player } from "./player";
import { Game } from "./game";
export declare class Automata {
    private game;
    private _gameOver;
    private _partialRunCounter;
    constructor(game: Game);
    tryStockCard(): boolean;
    tryHandCard(): boolean;
    tryDiscardPile(): boolean;
    singleRun(): boolean;
    playTurn(): void;
    readonly currentPlayer: Player;
    getWinner(): Player;
    gameCompleted(): Boolean;
    checkWinner(): void;
    run(): void;
}
