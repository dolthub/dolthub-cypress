import { deviceDimensions, opts } from "../../../../../utils";

const tempDbOwnerNames = ["cypresstesting"];
const pageName = `Delete all remaining temp databases`;
const loggedIn = true;
const base = Cypress.config().baseUrl;
const clickOpts: Partial<Cypress.ClickOptions> = {
  scrollBehavior: "bottom",
};

function cleanupLeftoverTempDbs(owner: string) {
  it(`deletes temp databases for ${owner} if they exist`, () => {
    const currentPage = `/repositories/${owner}`;
    cy.visitAndWait(currentPage);
    cy.get("[data-cy=discover-repos-tab]").should("be.visible");
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
        cy.visitAndWait("/profile"); // after deleting, automated_testing lands on a page that has different navbar, redirect to profile to get the same navbar data-cy for signout
      }
    });
  });
  // });

  function deleteDatabase(href: string | null) {
    if (!href || !href.includes("temp_db_")) return;

    cy.visitAndWait(`${href}/settings`);

    cy.location("pathname", opts).should("contain", "settings");

    cy.get("[data-cy=delete-database-button]", opts)
      .scrollIntoView(clickOpts)
      .click(clickOpts);

    cy.get("[data-cy=submit-delete-database]", opts).click(clickOpts);

    cy.location("href", opts).should("eq", `${base}/profile`);
  }
}

describe(pageName, deviceDimensions["macbook-15"], () => {
  before(() => {
    cy.handleGoogle();
    if (loggedIn) {
      cy.loginAsCypressTestingAfterNavigateToSignin();
    }
  });

  after(() => {
    if (loggedIn) cy.signout(false);
  });

  tempDbOwnerNames.forEach(owner => {
    cleanupLeftoverTempDbs(owner);
  });
});
