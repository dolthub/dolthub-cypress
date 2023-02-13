import { deviceDimensions } from "@utils/index";
import {
  completeLoginForCypressTesting,
  ensureSuccessfulLogin,
} from "cypress/support/commands";

const pageName = "Sign in page";
const currentPageWithRedirect = "/signin?redirect=%2Fsettings";
const loggedIn = true;

describe(pageName, deviceDimensions["macbook-15"], () => {
  before(() => {
    cy.visitAndWait(currentPageWithRedirect);
    cy.handleGoogle();
    cy.location("pathname").should("eq", `/signin`);
    cy.location("search")
      .should("eq", `?redirect=%2Fsettings`)
      .then(() => {
        completeLoginForCypressTesting();
        ensureSuccessfulLogin("settings");
      });
  });

  after(() => {
    if (loggedIn) cy.signout(false);
  });

  it("should redirect to /settings page after sign in", () => {
    cy.get("[data-cy=settings-header]").should("be.visible");
  });
});
