const pageName = "Blog RSS feed page";
const currentPage = "/rss.xml";
const skip = !!Cypress.env("LOCAL_DOLTHUB") || !!Cypress.env("LOCAL_BLOG");

describe(`${pageName} renders expected components on different devices`, () => {
  if (skip) {
    xit("gets blog RSS feed", () => {});
  } else {
    it("gets blog RSS feed", () => {
      cy.request({ url: currentPage }).its("status").should("equal", 200);
      cy.request({ url: currentPage })
        .its("body")
        .should("contain", "DoltHub Blog");
    });
  }
});
