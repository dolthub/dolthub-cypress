const skip = !!Cypress.env("LOCAL_DOLTHUB") || !!Cypress.env("LOCAL_BLOG");

describe(`Blog RSS feed page renders expected components on different devices`, () => {
  if (skip) {
    xit("gets blog RSS feed", () => {});
  } else {
    it("gets blog RSS feed", () => {
      cy.request({ url: "/blog/rss.xml" }).its("status").should("equal", 200);
      cy.request({ url: "/blog/rss.xml" })
        .its("body")
        .should("contain", "DoltHub Blog");
    });
  }
});
