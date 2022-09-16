describe(`sitemap page renders expected components on different devices`, () => {
  it("gets site map", () => {
    cy.request({ url: "/sitemap.xml" }).its("status").should("equal", 200);
    cy.request({ url: "/sitemap.xml" }).its("body").should("contain", "url");
  });
});
