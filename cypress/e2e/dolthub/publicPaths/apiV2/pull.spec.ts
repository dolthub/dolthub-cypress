export {};

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "corona-virus";
const pullNumber = "1";

describe(`GET /${repoOwner}/${repoName}/pulls/${pullNumber} returns pull request details`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/pulls/${pullNumber}`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains the correct pull request details", () => {
    cy.request({ url: earl }).its("body.data.pull_number").should("equal", 1);
    cy.request({ url: earl }).its("body.data.state").should("equal", "merged");
    cy.request({ url: earl })
      .its("body.data.title")
      .should("equal", "Crowdsourced");
    cy.request({ url: earl })
      .its("body.data.creator")
      .should("equal", "cypresstesting");
  });
  it("contains structured from_branch and to_branch references", () => {
    cy.request({ url: earl })
      .its("body.data.from_branch")
      .should("deep.equal", {
        database: { owner: repoOwner, name: repoName },
        branch_name: "crowdsource-case-details",
      });
    cy.request({ url: earl })
      .its("body.data.to_branch")
      .should("deep.equal", {
        database: { owner: repoOwner, name: repoName },
        branch_name: "master",
      });
  });
});

describe(`GET /${repoOwner}/${repoName}/pulls/99999 returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/pulls/99999`;
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

describe(`GET /nonexistent_owner/nonexistent_database/pulls/${pullNumber} returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/nonexistent_owner/nonexistent_database/pulls/${pullNumber}`;
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
      .should("equal", "no such repository");
  });
});
