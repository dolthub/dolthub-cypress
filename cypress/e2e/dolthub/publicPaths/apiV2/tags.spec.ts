export {};

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "repo_with_tags_and_branches";

describe(`GET /${repoOwner}/${repoName}/tags returns tags`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/tags`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains an array of tags", () => {
    cy.request({ url: earl })
      .its("body.data")
      .should("be.an", "array")
      .and("have.length.above", 10);
  });
  it("contains tags with the expected fields", () => {
    cy.request({ url: earl })
      .its("body.data")
      .then(tags => {
        expect(tags[0]).to.include.keys(["name", "commit_sha", "tagged_at"]);
      });
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/tags returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/nonexistent_owner/nonexistent_database/tags`;
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
