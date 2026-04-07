const pageName = "Blog RSS feed page";
const currentPage = `/blog/rss.xml`;
const skip = !!Cypress.expose("LOCAL_DOLTHUB");

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

export { };

