describe(`$robots page renders expected components on different devices`, () => {
  it("gets robots", () => {
    cy.request({ url: "/robots.txt" }).its("status").should("equal", 200);
    cy.request({ url: "/robots.txt" })
      .its("body")
      .should("contain", "Sitemap: ");
  });
});
