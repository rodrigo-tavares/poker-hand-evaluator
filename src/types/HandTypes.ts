import { Suit } from "./SuitTypes";
import { Rank } from "./RankTypes";

export interface HandResult {
  winner?: "hand1" | "hand2" | "tie";
  hand1Rank: string;
  hand2Rank: string;
}

export type Hand = {
  suit: Suit;
  rank: Rank;
};

export type HandSelectorPropTypes = {
  hand: Hand[];
  setHand: (props: Hand[]) => void;
  label: string;
  winner: boolean;
  setShowHelp: () => void;
};
