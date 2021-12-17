import { clickOpts, opts } from "../../../../utils";

function zLastCleanup(owner: string) {
  const pageName = `Delete all remaining ${owner} temp databases`;
  const currentPage = `/repositories/${owner}`;
  const loggedIn = true;
  const base = Cypress.config().baseUrl;

  describe.skip(pageName, () => {
    before(() => {
      cy.visitPage(currentPage, loggedIn);
    });

    beforeEach(() => {
      // Preserve dolthubToken cookie through all tests for page
      Cypress.Cookies.preserveOnce("dolthubToken");

      cy.visitViewport("macbook-15");
    });

    after(() => {
      if (loggedIn) cy.signout(false);
    });

    it("deletes temp databases if they exist", () => {
      cy.get("body", opts).then($body => {
        // Check if cypresstesting databases exist
        if ($body.text().includes(`No search results for "${owner}"`)) {
          cy.get("[data-cy=no-repos-msg]").should("be.visible");
          cy.get("[data-cy=navbar-desktop-profile-link]", opts).click();
          cy.location("href", opts).should(
            "eq",
            `${Cypress.config().baseUrl}/profile`,
          );
        } else {
          // If they do exist, go through each database and delete
          cy.get(
            "[data-cy=repository-list-most-recent] [data-cy=repo-list-item] a",
            opts,
          ).then(items => {
            [...items].forEach(i => {
              deleteDatabase(i.getAttribute("href"));
            });
          });
          cy.visitPage("/profile", loggedIn); // after deleting, automated_testing lands on a page that has different navbar, redirect to profile to get the same navbar data-cy for signout
        }
      });
    });
  });

  function deleteDatabase(href: string | null) {
    if (!href || !href.includes("temp_db_")) return;

    cy.visitPage(href, false);

    cy.wait(300);

    cy.get("[data-cy=repo-settings-tab]>a", opts)
      .should("be.visible")
      .click(clickOpts);

    cy.location("pathname", opts).should("contain", "settings");

    cy.get("[data-cy=delete-database-button]", opts)
      .scrollIntoView(clickOpts)
      .click(clickOpts);

    cy.get("[data-cy=submit-delete-database]", opts).click(clickOpts);

    cy.location("href", opts).should("eq", `${base}/profile`);
  }
}
zLastCleanup("automated_testing");
zLastCleanup("cypresstesting");
