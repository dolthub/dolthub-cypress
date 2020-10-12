import { visitPage, visitViewport } from "../../../../utils";

const pageName = "Sign in page with log in";
const currentPage = "/signin";

// const username = "cypresstesting";
// DO NOT COMMIT
// const password = "ThisIsMyPassword!";

describe(`${pageName} renders expected components on different devices`, () => {
  before(() => {
    visitPage(currentPage, false);
  });

  beforeEach(() => {
    visitViewport("macbook-15");
  });

  it("displays errors on login", () => {
    cy.get("[data-cy=signin-button]").click();
    cy.get("[data-cy=signin-email-form]").should("be.visible");

    // incorrect username on purpose
    cy.get("input[name=username]").type("invalid^username");
    cy.get("input[name=password]").type("password123{enter}");

    cy.get("[data-cy=error-msg]").should("be.visible");
  });
});
