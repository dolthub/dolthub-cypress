const pageName = "Blog RSS feed page";
const rssPage = `/blog/rss.xml`;
const rssAllPage = `/blog/rss-all.xml`;

describe(`${pageName} renders expected components on different devices`, () => {
  it("gets blog RSS feed", () => {
    cy.request({ url: rssPage }).its("status").should("equal", 200);
    cy.request({ url: rssPage }).its("body").should("contain", "DoltHub Blog");
  });

  it("gets blog RSS feed, all posts", () => {
    cy.request({ url: rssAllPage }).its("status").should("equal", 200);
    cy.request({ url: rssAllPage })
      .its("body")
      .should("contain", "DoltHub Blog");
  });
});

export { };

