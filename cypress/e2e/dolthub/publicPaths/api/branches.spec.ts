const apiVersion = "v1alpha1";
const repoOwner = "automated_testing";
const repoName = "corona-virus";

describe(`GET /${repoOwner}/${repoName}/branches returns branches`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}/branches`;
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
  it("contains an array of branches", () => {
    cy.request({ url: earl })
      .its("body.branches")
      .should("be.an", "array")
      .and("have.length.above", 0);
  });
  it("contains the master branch", () => {
    cy.request({ url: earl })
      .its("body.branches")
      .should("deep.include", { branch_name: "master" });
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/branches returns 400`, () => {
  const earl = `/api/${apiVersion}/nonexistent_owner/nonexistent_database/branches`;
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
