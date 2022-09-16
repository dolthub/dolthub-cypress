const pageName = "robots page";
const currentPage = "/robots.txt";

describe(`${pageName} page renders expected components on different devices`, () => {
  it("gets robots", () => {
    cy.request({ url: currentPage }).its("status").should("equal", 200);
    cy.request({ url: currentPage }).its("body").should("contain", "Sitemap: ");
  });
});

export {};
