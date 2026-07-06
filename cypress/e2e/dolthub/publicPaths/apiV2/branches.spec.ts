export {};

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "corona-virus";

describe(`GET /${repoOwner}/${repoName}/branches returns branches`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/branches`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains an array of branches", () => {
    cy.request({ url: earl })
      .its("body.data")
      .should("be.an", "array")
      .and("have.length.above", 0);
  });
  it("contains the master branch with the expected fields", () => {
    cy.request({ url: earl })
      .its("body.data")
      .then(branches => {
        const master = branches.find(
          (branch: { name: string }) => branch.name === "master",
        );
        expect(master).to.include.keys([
          "name",
          "head_commit_sha",
          "last_updated_at",
        ]);
      });
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/branches returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/nonexistent_owner/nonexistent_database/branches`;
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
