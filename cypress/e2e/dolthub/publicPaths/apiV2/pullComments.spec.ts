export {};

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "corona-virus";
const pullNumber = "1";

describe(`GET /${repoOwner}/${repoName}/pulls/${pullNumber}/comments returns pull request comments`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/pulls/${pullNumber}/comments`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains an array of comments", () => {
    cy.request({ url: earl }).its("body.data").should("be.an", "array");
  });
});

describe(`GET /${repoOwner}/${repoName}/pulls/99999/comments returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/pulls/99999/comments`;
  it("gets a 404 response from the API", () => {
    cy.request({ url: earl, failOnStatusCode: false })
      .its("status")
      .should("equal", 404);
  });
  it("contains the RFC 9457 problem details in the response body", () => {
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.code")
      .should("equal", "NOT_FOUND");
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.detail")
      .should("equal", "no such pull");
  });
});
