export {};

const apiVersion = "v1alpha1";
const repoOwner = "automated_testing";
const repoName = "repo_with_tags_and_branches";

describe(`GET /${repoOwner}/${repoName}/releases returns releases`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}/releases`;
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
    cy.request({ url: earl }).its("body.next_page_token").should("exist");
  });
  it("contains a releases array", () => {
    cy.request({ url: earl }).its("body.releases").should("be.an", "array");
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/releases returns 400`, () => {
  const earl = `/api/${apiVersion}/nonexistent_owner/nonexistent_database/releases`;
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
