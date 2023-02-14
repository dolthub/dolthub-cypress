describe("test blog page on mobile", () => {
  before(() => {
    cy.visitPage(
      "www.dolthub.com/repositories/automated_testing/repo_tables_and_docs/workspaces/4ef937bb-d5ee-4a75-93b0-424396f76a71?q=insert into test_table (pk, a, b, c) values (2, 3, 4, 5);`",
      false,
    );
    cy.viewport("macbook-15");
    cy.wait(500);
  });

  it("should trigger nav button", () => {
    cy.get("[data-cy=repository-layout-container]").should("be.visible");
  });
});
