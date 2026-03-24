export {};

const apiVersion = "v1alpha1";
const repoOwner = "automated_testing";
const repoName = "corona-virus";

describe(`GET /${repoOwner}/${repoName}/pulls returns pull requests`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}/pulls`;
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
  it("contains an array of pull requests", () => {
    cy.request({ url: earl })
      .its("body.pulls")
      .should("be.an", "array")
      .and("have.length.above", 0);
  });
  it("contains pull requests with the expected fields", () => {
    cy.request({ url: earl })
      .its("body.pulls")
      .then(pulls => {
        expect(pulls[0]).to.include.keys([
          "pull_id",
          "title",
          "state",
          "creator",
          "created_at",
        ]);
      });
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/pulls returns 400`, () => {
  const earl = `/api/${apiVersion}/nonexistent_owner/nonexistent_database/pulls`;
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
