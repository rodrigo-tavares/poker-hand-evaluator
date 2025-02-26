export type Suit = "spade" | "heart" | "diamonds" | "clubs";

export const SuitMap = {
  S: "spade",
  H: "heart",
  D: "diamonds",
  C: "clubs",
} as const;

export const suits = ["spade", "heart", "diamonds", "clubs"] as const;
