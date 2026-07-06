export {};

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "corona-virus";

describe(`GET /${repoOwner}/${repoName} returns database metadata`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains the correct database metadata in the response body", () => {
    cy.request({ url: earl }).its("body.data.owner").should("equal", repoOwner);
    cy.request({ url: earl }).its("body.data.name").should("equal", repoName);
    cy.request({ url: earl })
      .its("body.data.visibility")
      .should("equal", "public");
  });
  it("contains fork network metadata since this database is a fork", () => {
    cy.request({ url: earl })
      .its("body.data.parent")
      .should("deep.equal", { owner: "dolthub", name: repoName });
    cy.request({ url: earl })
      .its("body.data.network_root")
      .should("deep.equal", { owner: "dolthub", name: repoName });
    cy.request({ url: earl })
      .its("body.data.fork_network_count")
      .should("be.a", "number");
  });
});

describe(`GET /nonexistent_owner/nonexistent_database returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/nonexistent_owner/nonexistent_database`;
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
