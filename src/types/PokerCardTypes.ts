import { Hand } from "./HandTypes";

export type PokerCardPropTypes = {
  hand: Hand;
  isRevealed: boolean;
};


type Suit = "S" | "H" | "D" | "C";
type Rank =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

export type Card = `${Rank}${Suit}`;
