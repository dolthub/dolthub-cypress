const apiVersion = "v1alpha1";
const repoOwner = "automated_testing";
const repoName = "corona-virus";
const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";
const pullId = isProd ? "5" : "1";

describe(`GET /${repoOwner}/${repoName}/pulls/${pullId} returns pull request details`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}/pulls/${pullId}`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains the correct metadata in the response body", () => {
    cy.request({ url: earl }).its("body.status").should("equal", "Success");
    cy.request({ url: earl })
      .its("body.database_owner")
      .should("equal", repoOwner);
    cy.request({ url: earl })
      .its("body.database_name")
      .should("equal", repoName);
  });
  it("contains the correct pull request details", () => {
    cy.request({ url: earl }).its("body.pull_id").should("equal", pullId);
    cy.request({ url: earl }).its("body.state").should("equal", "Merged");
    cy.request({ url: earl })
      .its("body.from_branch")
      .should("be.a", "string")
      .and("not.be.empty");
    cy.request({ url: earl })
      .its("body.to_branch")
      .should("be.a", "string")
      .and("not.be.empty");
    cy.request({ url: earl })
      .its("body.author")
      .should("be.a", "string")
      .and("not.be.empty");
  });
});

describe(`GET /${repoOwner}/${repoName}/pulls/99999 returns 400`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}/pulls/99999`;
  it("gets a 400 response from the API", () => {
    cy.request({ url: earl, failOnStatusCode: false })
      .its("status")
      .should("equal", 400);
  });
  it("contains the correct error metadata in the response body", () => {
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.status")
      .should("equal", "Error");
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.message")
      .should("equal", "no such pull");
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.database_owner")
      .should("equal", repoOwner);
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.database_name")
      .should("equal", repoName);
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.pull_id")
      .should("equal", "99999");
  });
});
