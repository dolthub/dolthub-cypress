const pageName = "Blog RSS feed page";
const currentPage = `/blog/rss.xml`;

describe(`${pageName} renders expected components on different devices`, () => {
  it("gets blog RSS feed", () => {
    cy.request({ url: currentPage }).its("status").should("equal", 200);
    cy.request({ url: currentPage })
      .its("body")
      .should("contain", "DoltHub Blog");
  });
});

export { };

