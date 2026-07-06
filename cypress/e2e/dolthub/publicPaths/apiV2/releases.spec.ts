export {};

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "repo_with_tags_and_branches";

describe(`GET /${repoOwner}/${repoName}/releases returns releases`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/releases`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains an array of releases", () => {
    cy.request({ url: earl })
      .its("body.data")
      .should("be.an", "array")
      .and("have.length.of.at.least", 1);
  });
  it("contains releases with the expected fields", () => {
    cy.request({ url: earl })
      .its("body.data")
      .then(releases => {
        expect(releases[0]).to.include.keys([
          "tag",
          "title",
          "commit_sha",
          "created_at",
          "updated_at",
        ]);
      });
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/releases returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/nonexistent_owner/nonexistent_database/releases`;
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
