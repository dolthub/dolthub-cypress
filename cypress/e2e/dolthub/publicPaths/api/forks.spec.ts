const apiVersion = "v1alpha1";
const repoOwner = "automated_testing";
const repoName = "corona-virus";

describe(`GET /${repoOwner}/${repoName}/forks returns fork network`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}/forks`;
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
  it("contains an array of forks", () => {
    cy.request({ url: earl })
      .its("body.forks")
      .should("be.an", "array")
      .and("have.length.above", 0);
  });
  it("contains fork network metadata", () => {
    cy.request({ url: earl })
      .its("body.fork_network_count")
      .should("be.a", "number")
      .and("be.above", 0);
    cy.request({ url: earl })
      .its("body.parent_owner")
      .should("be.a", "string")
      .and("not.be.empty");
    cy.request({ url: earl })
      .its("body.parent_database_name")
      .should("be.a", "string")
      .and("not.be.empty");
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/forks returns 400`, () => {
  const earl = `/api/${apiVersion}/nonexistent_owner/nonexistent_database/forks`;
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
      .should("equal", "no such repository");
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.database_owner")
      .should("equal", "nonexistent_owner");
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.database_name")
      .should("equal", "nonexistent_database");
  });
});
