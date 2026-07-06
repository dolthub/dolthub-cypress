export {};

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "corona-virus";

describe(`GET /${repoOwner}/${repoName}/forks returns the direct fork children`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/forks`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains an array, empty since this database has no forks of its own", () => {
    cy.request({ url: earl }).its("body.data").should("deep.equal", []);
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/forks returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/nonexistent_owner/nonexistent_database/forks`;
  it("gets a 404 response from the API", () => {
    cy.request({ url: earl, failOnStatusCode: false })
      .its("status")
      .should("equal", 404);
  });
  it("contains the RFC 9457 problem details in the response body", () => {
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.status")
      .should("equal", 404);
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.code")
      .should("equal", "NOT_FOUND");
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.detail")
      .should("equal", "no such repository");
  });
});
