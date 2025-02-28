import { renderHook } from "@testing-library/react";
import usePokerEvaluator from "@/hooks/usePokerEvaluator";
import { Hand } from "@/types/HandTypes";
import { SuitMap } from "@/types/SuitTypes";
import { Rank } from "@/types/RankTypes";

const createHand = (cards: string[]): Hand[] => {
  return cards.map((card) => ({
    rank: card.slice(0, -1) as Rank,
    suit: SuitMap[card.slice(-1) as keyof typeof SuitMap],
    isRevealed: true,
  }));
};

describe("usePokerEvaluator", () => {
  it("should identify a winner when one hand ranks higher", () => {
    const hand1 = createHand(["AS", "KS", "QS", "JS", "10S"]);
    const hand2 = createHand(["2H", "2D", "2C", "3S", "3H"]);

    const { result } = renderHook(() => usePokerEvaluator(hand1, hand2));
    expect(result.current.winner).toBe("hand2");
    expect(result.current.hand1Rank).toBe("Flush");
    expect(result.current.hand2Rank).toBe("Full House");
  });

  it("should return a tie when both hands have the same rank", () => {
    const hand1 = createHand(["2S", "3S", "4S", "5S", "6S"]);
    const hand2 = createHand(["2H", "3H", "4H", "5H", "6H"]);

    const { result } = renderHook(() => usePokerEvaluator(hand1, hand2));
    expect(result.current.winner).toBe("tie");
  });

  it("should return undefined if hands are incomplete", () => {
    const hand1 = createHand(["AS", "KS"]);
    const hand2 = createHand(["2H", "3H", "4H", "5H"]);

    const { result } = renderHook(() => usePokerEvaluator(hand1, hand2));
    expect(result.current.winner).toBeUndefined();
  });

  it("should correctly identify a Flush and a Straight", () => {
    const hand1 = createHand(["2S", "5S", "7S", "9S", "KS"]); // Flush
    const hand2 = createHand(["2H", "3D", "4C", "5S", "6H"]); // Straight

    const { result } = renderHook(() => usePokerEvaluator(hand1, hand2));
    expect(result.current.winner).toBe("hand1");
    expect(result.current.hand1Rank).toBe("Flush");
    expect(result.current.hand2Rank).toBe("Straight");
  });
});
