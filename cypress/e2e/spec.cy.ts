describe("Draw colorful boxes", () => {
  before(() => {
    cy.visit("/");
  });

  it("Add box with Red color", () => {
    cy.get('[data-cy="box-with-color"]').eq(0).click();
    cy.get('[data-cy="plus-button"]').click();
    cy.get('[data-cy="color-box"]')
      .eq(0)
      .should("have.text", 1)
      .and("have.css", "background-color", "rgb(239, 68, 68)");
  });

  it("Add box with Blue color", () => {
    cy.get('[data-cy="box-with-color"]').eq(1).click();
    cy.get('[data-cy="plus-button"]').click();
    cy.get('[data-cy="color-box"]')
      .eq(1)
      .should("have.text", 2)
      .and("have.css", "background-color", "rgb(59, 130, 246)");
  });

  it("Add box with Yellow color", () => {
    cy.get('[data-cy="box-with-color"]').eq(2).click();
    cy.get('[data-cy="plus-button"]').click();
    cy.get('[data-cy="color-box"]')
      .eq(2)
      .should("have.text", 3)
      .and("have.css", "background-color", "rgb(234, 179, 8)");
  });

  it("Remove last box", () => {
    cy.get('[data-cy="minus-button"]').click();
    cy.get('[data-cy="color-box"]').eq(2).should("not.exist");
  });

  it("Clear draw pad", () => {
    cy.get('[data-cy="clear-all-button"]').click();
    cy.get('[data-cy="color-box"]').should("not.exist");
    cy.get('[data-cy="count-selected-elements"]').should(
      "contain.text",
      "0 Elements"
    );
  });
});
