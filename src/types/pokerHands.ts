export type Suit = "spade" | "heart" | "diamonds" | "clubs";

export const SuitMap = {
  S: "spade",
  H: "heart",
  D: "diamonds",
  C: "clubs",
};

export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export const suits = ["spade", "heart", "diamonds", "clubs"];
export const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export interface HandResult {
  winner?: "hand1" | "hand2" | "tie";
  hand1Rank: string;
  hand2Rank: string;
}

export type Hand = {
  suit: string;
  rank: string;
};

export type HandSelectorPropTypes = {
  hand: Hand[];
  setHand: (props: Hand[]) => void;
  label: string;
  winner: boolean;
  setShowHelp: () => void;
};

export type PokerCardPropTypes = {
  hand: Hand;
  isRevealed: boolean;
};
