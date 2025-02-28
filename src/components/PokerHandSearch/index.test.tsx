import PokerHandSearch from "../PokerHandSearch";
import { screen, fireEvent } from "@testing-library/react";
import { Hand } from "@/types/HandTypes";
import { renderWithProviders } from "@/utils/testUtils";
import { beforeEach, Mock, vi } from "vitest";
import { Suit } from "@/types/SuitTypes";

describe("PokerHandSearch", () => {
  let hand: Hand[];
  let handleHand: Mock;

  beforeEach(() => {
    hand = [];
    handleHand = vi.fn();
  });

  test("renders input field and search placeholder", () => {
    renderWithProviders(
      <PokerHandSearch hand={hand} handleHand={handleHand} />
    );

    const input = screen.getByPlaceholderText(
      "Search for a card (e.g., AS, 10H)..."
    );
    expect(input).toBeInTheDocument();
  });

  test("updates input value when typing", () => {
    renderWithProviders(
      <PokerHandSearch hand={hand} handleHand={handleHand} />
    );

    const input = screen.getByPlaceholderText(
      "Search for a card (e.g., AS, 10H)..."
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "A" } });

    expect(input.value).toBe("A");
  });

  test("displays filtered card list when searching", () => {
    renderWithProviders(
      <PokerHandSearch hand={hand} handleHand={handleHand} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Search for a card (e.g., AS, 10H)..."),
      {
        target: { value: "AS" },
      }
    );

    expect(screen.getByText("AS")).toBeInTheDocument();
  });

  test("selects a card when clicked", () => {
    renderWithProviders(
      <PokerHandSearch hand={hand} handleHand={handleHand} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Search for a card (e.g., AS, 10H)..."),
      {
        target: { value: "AS" },
      }
    );

    const card = screen.getByText("AS");
    fireEvent.click(card);

    expect(handleHand).toHaveBeenCalledWith([
      { rank: "A", suit: "spade", isRevealed: true },
    ]);
  });

  test("disables input when 5 cards are selected", () => {
    hand = [
      { rank: "A", suit: "spades" as Suit, isRevealed: true },
      { rank: "K", suit: "hearts" as Suit, isRevealed: true },
      { rank: "Q", suit: "diamonds" as Suit, isRevealed: true },
      { rank: "J", suit: "clubs" as Suit, isRevealed: true },
      { rank: "10", suit: "spades" as Suit, isRevealed: true },
    ];
    renderWithProviders(
      <PokerHandSearch hand={hand} handleHand={handleHand} />
    );

    const input = screen.getByPlaceholderText(
      "Search for a card (e.g., AS, 10H)..."
    ) as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  test("opens and closes notation guide", () => {
    renderWithProviders(
      <PokerHandSearch hand={hand} handleHand={handleHand} />
    );

    const helpButton = screen.getByLabelText("See notation guide");
    fireEvent.click(helpButton);

    expect(screen.getByText("Card Notation Guide")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText("Card Notation Guide")).not.toBeInTheDocument();
  });
});
