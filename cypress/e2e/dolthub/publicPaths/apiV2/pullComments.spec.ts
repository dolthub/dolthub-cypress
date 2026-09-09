import { getPullNumberByTitle } from "@utils/apiV2";

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "corona-virus";
const pullTitle = "Crowdsourced";
const pullsUrl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/pulls`;

describe(`GET /${repoOwner}/${repoName}/pulls/{pull_number}/comments returns pull request comments`, () => {
  let earl = "";

  before(() => {
    getPullNumberByTitle(pullsUrl, pullTitle).then(num => {
      earl = `${pullsUrl}/${num}/comments`;
    });
  });

  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains an array of comments", () => {
    cy.request({ url: earl }).its("body.data").should("be.an", "array");
  });
});

describe(`GET /${repoOwner}/${repoName}/pulls/99999/comments returns 404`, () => {
  const earl = `${pullsUrl}/99999/comments`;
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
