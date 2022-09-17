const pageName = "sitemap page";
const currentPage = "/sitemap.xml";

describe(`${pageName} renders expected components on different devices`, () => {
  it("gets site map", () => {
    cy.request({ url: currentPage }).its("status").should("equal", 200);
    cy.request({ url: currentPage }).its("body").should("contain", "url");
  });
});

export {};
