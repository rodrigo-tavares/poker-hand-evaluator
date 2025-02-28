describe("Hand Selector", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should deal five cards when clicking the deal button", () => {
    cy.get("button").contains("Deal Cards").click();
    cy.get("[data-testid='poker-card']").should("have.length", 5);
  });

  it("should show a winner when two hands are compared", () => {
    cy.get("button").contains("Deal Cards").click();
    cy.wait(1000);

    cy.get("[data-testid='deal-hand-Player 2']").click();
    cy.wait(1000);

    cy.get("[data-testid='winner-message']").should("be.visible");
  });
});
