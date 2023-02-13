describe(
  "test blog page on mobile",
  { viewportWidth: 768, viewportHeight: 1024 },
  () => {
    before(() => {
      // create the stub here
      const ga = cy.stub().as("ga");

      // prevent google analytics from loading and replace it with a stub before every
      // single page load including all new page navigations
      cy.on("window:before:load", win => {
        if (!Object.getOwnPropertyDescriptor(win, "ga")) {
          Object.defineProperty(win, "ga", {
            configurable: false,
            get: () => ga, // always return the stub
            set: () => {}, // don't allow actual google analytics to overwrite this property
          });
        }
      });
      cy.visit(
        "https://www.dolthub.com/blog/2020-03-06-so-you-want-git-for-data/",
      );
    });

    it("should trigger nav button", () => {
      cy.intercept("/blog/page-data/index/page-data.json").as("json");
      cy.wait("@json");
      cy.get(`[data-cy=mobile-navbar-menu-button]`).click();
      cy.get("[data-cy=mobile-navbar-links] > li").should("be.visible");
    });
  },
);
