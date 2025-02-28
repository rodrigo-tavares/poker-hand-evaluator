import { renderWithProviders } from "@/utils/testUtils";
import HandSelector from "../HandSelector";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Hand } from "@/types/HandTypes";
import { beforeEach, Mock, vi } from "vitest";

describe("HandSelector", () => {
  let hand: Hand[];
  let setHand: Mock;

  beforeEach(() => {
    hand = [];
    setHand = vi.fn();
  });

  test("renders label correctly", () => {
    renderWithProviders(
      <HandSelector
        hand={hand}
        setHand={setHand}
        label="Player 1"
        winner={false}
      />
    );
    expect(screen.getByText("Player 1")).toBeInTheDocument();
  });

  test("renders 5 placeholder cards initially", () => {
    renderWithProviders(
      <HandSelector
        hand={hand}
        setHand={setHand}
        label="Player 1"
        winner={false}
      />
    );
    const cards = screen.getAllByRole("presentation");
    expect(cards.length).toBe(5);
  });

  test("disables deal button when 5 cards are already selected", () => {
    hand = [
      { rank: "A", suit: "spade" },
      { rank: "K", suit: "heart" },
      { rank: "Q", suit: "diamonds" },
      { rank: "J", suit: "clubs" },
      { rank: "10", suit: "spade" },
    ];
    renderWithProviders(
      <HandSelector
        hand={hand}
        setHand={setHand}
        label="Player 1"
        winner={false}
      />
    );
    expect(screen.getByRole("button", { name: /deal cards/i })).toBeDisabled();
  });

  test("calls setHand with 5 new cards when clicking 'Deal Cards'", async () => {
    renderWithProviders(
      <HandSelector
        hand={hand}
        setHand={setHand}
        label="Player 1"
        winner={false}
      />
    );
    const button = screen.getByRole("button", { name: /deal cards/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(setHand).toHaveBeenCalledWith(
        expect.arrayContaining([
          { rank: expect.any(String), suit: expect.any(String) },
        ])
      );
    });
  });

  test("resets reveal state when hand is empty", () => {
    renderWithProviders(
      <HandSelector
        hand={[]}
        setHand={setHand}
        label="Player 1"
        winner={false}
      />
    );
    expect(screen.queryByText("isRevealed: true")).not.toBeInTheDocument();
  });
});
