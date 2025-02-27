import { Hand, HandResult } from "@/types/HandTypes";
import { useMemo } from "react";

const getHandRank = (hand: Hand[]): string => {
  const ranks = hand.map((card) => card.rank);
  const suits = hand.map((card) => card.suit);

  const rankCount: Record<string, number> = {};
  ranks.forEach((rank) => (rankCount[rank] = (rankCount[rank] || 0) + 1));

  const isFlush = new Set(suits).size === 1;
  const sortedRanks = ranks
    .map((r) => "23456789TJQKA".indexOf(r))
    .sort((a, b) => a - b);
  const isStraight = sortedRanks.every(
    (r, i) => i === 0 || r === sortedRanks[i - 1] + 1
  );

  if (isStraight && isFlush) return "Straight Flush";
  if (Object.values(rankCount).includes(4)) return "Four of a Kind";
  if (
    Object.values(rankCount).includes(3) &&
    Object.values(rankCount).includes(2)
  )
    return "Full House";
  if (isFlush) return "Flush";
  if (isStraight) return "Straight";
  if (Object.values(rankCount).includes(3)) return "Three of a Kind";
  if (Object.values(rankCount).filter((v) => v === 2).length === 2)
    return "Two Pair";
  if (Object.values(rankCount).includes(2)) return "One Pair";

  return "High Card";
};

const usePokerEvaluator = (hand1: Hand[], hand2: Hand[]): HandResult => {
  return useMemo(() => {
    const hand1Rank = getHandRank(hand1);
    const hand2Rank = getHandRank(hand2);

    const rankingOrder = [
      "High Card",
      "One Pair",
      "Two Pair",
      "Three of a Kind",
      "Straight",
      "Flush",
      "Full House",
      "Four of a Kind",
      "Straight Flush",
    ];

    const hand1Score = rankingOrder.indexOf(hand1Rank);
    const hand2Score = rankingOrder.indexOf(hand2Rank);

    let winner: "hand1" | "hand2" | "tie" | undefined = undefined;
    if (hand1.length === 5 && hand2.length === 5) {
      if (hand1Score > hand2Score) winner = "hand1";
      else if (hand2Score > hand1Score) winner = "hand2";
      else winner = "tie";
    }

    return { winner, hand1Rank, hand2Rank };
  }, [hand1, hand2]);
};

export default usePokerEvaluator;
