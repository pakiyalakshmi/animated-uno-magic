import { Card, CardColor, CardNumber } from "@/types/uno";

const colors: CardColor[] = ["red", "blue", "green", "yellow"];
const numbers: CardNumber[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  colors.forEach((color) => {
    numbers.forEach((number) => {
      deck.push({ color, number, id: `${color}-${number}-${Math.random()}` });
    });
  });
  return shuffle(deck);
};

export const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const isValidPlay = (card: Card, topCard: Card): boolean => {
  return card.color === topCard.color || card.number === topCard.number;
};

export const dealInitialCards = (): {
  playerHand: Card[];
  computerHand: Card[];
  discardPile: Card[];
} => {
  const deck = createDeck();
  return {
    playerHand: deck.slice(0, 7),
    computerHand: deck.slice(7, 14),
    discardPile: [deck[14]],
  };
};

export const computerPlay = (hand: Card[], topCard: Card): Card | null => {
  return hand.find((card) => isValidPlay(card, topCard)) || null;
};