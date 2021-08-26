import { clickOpts, opts } from "../../../../utils";

const pageName = "Delete all remaining cypresstesting temp databases";
const currentPage = "/repositories/cypresstesting";
const loggedIn = true;

describe(pageName, () => {
  before(() => {
    cy.visitPage(currentPage, loggedIn);
  });

  beforeEach(() => {
    // Preserve dolthubToken cookie through all tests for page
    Cypress.Cookies.preserveOnce("dolthubToken");

    cy.visitViewport("macbook-15");
  });

  after(() => {
    if (loggedIn) cy.signout();
  });

  it("deletes temp databases if they exist", () => {
    cy.get("body", opts).then($body => {
      // Check if cypresstesting databases exist
      if ($body.text().includes(`No search results for "cypresstesting"`)) {
        cy.get("[data-cy=no-repos-msg]").should("be.visible");
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
      }
    });
  });

  it("navigates back to profile", () => {
    cy.get("[data-cy=navbar-desktop-profile-link]", opts).click();
    cy.location("href", opts).should(
      "eq",
      `${Cypress.config().baseUrl}/profile`,
    );
  });
});

function deleteDatabase(href: string | null) {
  if (!href) return;
  cy.visitPage(href, false);

  cy.get("[data-cy=repo-settings-tab]", opts).click(clickOpts);

  cy.get("[data-cy=delete-database-button]", opts)
    .scrollIntoView(clickOpts)
    .click(clickOpts);

  cy.get("[data-cy=submit-delete-database]", opts).click(clickOpts);

  const base = Cypress.config().baseUrl;
  cy.location("href", opts).should("eq", `${base}/repositories/cypresstesting`);
}
