import { screen } from "@testing-library/react";
import GameHistory from ".";
import { HandResult } from "@/types/HandTypes";
import { renderWithProviders } from "@/utils/testUtils";

const mockHistory: HandResult[] = [
  { winner: "hand1", hand1Rank: "Straight", hand2Rank: "Flush" },
  { winner: "hand2", hand1Rank: "Two Pair", hand2Rank: "Full House" },
  { winner: "tie", hand1Rank: "Pair", hand2Rank: "Pair" },
];

describe("GameHistory Component", () => {
  test("renders without crashing", () => {
    renderWithProviders(<GameHistory history={[]} />);
  });

  test("displays the correct heading", () => {
    renderWithProviders(<GameHistory history={mockHistory} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Game History"
    );
  });

  test("renders the correct number of games", () => {
    renderWithProviders(<GameHistory history={mockHistory} />);
    const gameEntries = screen.getAllByText(/Game \d+ - /);
    expect(gameEntries.length).toBe(mockHistory.length);
  });

  test("displays correct game results", () => {
    renderWithProviders(<GameHistory history={mockHistory} />);

    expect(screen.getByText(/Game\s*1\s*-*\s*Winner/i)).toBeInTheDocument();
    expect(
      screen.getByText("Player 1: Straight | Player 2: Flush")
    ).toBeInTheDocument();

    expect(screen.getByText(/Game\s*2\s*-*\s*Winner/i)).toBeInTheDocument();
    expect(
      screen.getByText("Player 1: Two Pair | Player 2: Full House")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Game\s*3\s*-*\s*It's\s*a\s*Tie!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Player 1: Pair | Player 2: Pair")
    ).toBeInTheDocument();
  });
});
