import { screen } from "@testing-library/react";
import { Suit } from "@/types/SuitTypes";
import { renderWithProviders } from "@/utils/testUtils";
import PokerCard from ".";
import { Hand } from "@/types/HandTypes";

vitest.mock("react-icons/gi", () => ({
  GiSpades: () => <span data-testid="spade-icon">♠️</span>,
  GiHearts: () => <span data-testid="heart-icon">♥️</span>,
  GiDiamonds: () => <span data-testid="diamonds-icon">♦️</span>,
  GiClubs: () => <span data-testid="clubs-icon">♣️</span>,
}));

const mockHand = {
  rank: "Ace",
  suit: "spade" as Suit,
} as unknown as Hand;

const renderPokerCard = (isRevealed = true) => {
  renderWithProviders(<PokerCard hand={mockHand} isRevealed={isRevealed} />);
};

describe("PokerCard", () => {
  test("renders the card with the correct rank and suit when revealed", () => {
    renderPokerCard(true);

    expect(screen.getAllByText("Ace")[0]).toBeInTheDocument();

    expect(screen.getAllByTestId("spade-icon")[0]).toBeInTheDocument();
  });

  test("renders the card with the back face when not revealed", () => {
    renderPokerCard(false);
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  test("displays the correct suit icon based on the hand.suit prop", () => {
    const testSuits: Suit[] = ["spade", "heart", "diamonds", "clubs"];

    testSuits.forEach((suit) => {
      mockHand.suit = suit;
      renderPokerCard(true);

      let suitIcon;
      if (suit === "spade") suitIcon = "♠️";
      else if (suit === "heart") suitIcon = "♥️";
      else if (suit === "diamonds") suitIcon = "♦️";
      else suitIcon = "♣️";

      expect(screen.getAllByText(suitIcon)[0]).toBeInTheDocument();
    });
  });
});
