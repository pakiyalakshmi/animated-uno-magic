export type CardColor = "red" | "blue" | "green" | "yellow";
export type CardNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface Card {
  color: CardColor;
  number: CardNumber;
  id: string;
}

export interface GameState {
  playerHand: Card[];
  computerHand: Card[];
  discardPile: Card[];
  currentPlayer: "player" | "computer";
  gameStatus: "playing" | "victory" | "defeat";
}