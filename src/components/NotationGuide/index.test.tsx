import NotationGuide from ".";
import { renderWithProviders } from "@/utils/testUtils";
import { screen } from "@testing-library/react";

const setup = () => {
  renderWithProviders(<NotationGuide />);
};

describe("NotationGuide Component", () => {
  test("displays the correct heading", () => {
    setup();
    expect(screen.getByText("Card Notation Guide")).toBeInTheDocument();
  });

  test("displays the correct instructional text", () => {
    setup();
    expect(
      screen.getByText(/Enter cards using this format/i)
    ).toHaveTextContent("Enter cards using this format: AS 10H 7D 4C 2S");
  });

  test("renders the table with correct number of rows", () => {
    setup();
    expect(screen.getAllByRole("row").length).toBeGreaterThan(4);
  });

  test("displays correct symbols and suits", () => {
    setup();

    expect(screen.getByText(/\(S\)/)).toBeInTheDocument();
    expect(screen.getByText("Spades")).toBeInTheDocument();
    expect(screen.getByText("AS (Ace of Spades)")).toBeInTheDocument();

    expect(screen.getByText(/\(H\)/)).toBeInTheDocument();
    expect(screen.getByText("Hearts")).toBeInTheDocument();
    expect(screen.getByText("10H (10 of Hearts)")).toBeInTheDocument();

    expect(screen.getByText(/\(D\)/)).toBeInTheDocument();
    expect(screen.getByText("Diamonds")).toBeInTheDocument();
    expect(screen.getByText("7D (7 of Diamonds)")).toBeInTheDocument();

    expect(screen.getByText(/\(C\)/)).toBeInTheDocument();
    expect(screen.getByText("Clubs")).toBeInTheDocument();
    expect(screen.getByText("4C (4 of Clubs)")).toBeInTheDocument();
  });
});
