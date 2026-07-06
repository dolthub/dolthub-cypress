export {};

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "corona-virus";

describe(`GET /${repoOwner}/${repoName}/operations returns the database's async operations`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/operations`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains an array of operations", () => {
    cy.request({ url: earl })
      .its("body.data")
      .should("be.an", "array")
      .and("have.length.above", 0);
  });
  it("contains operations with the expected fields", () => {
    cy.request({ url: earl })
      .its("body.data")
      .then(operations => {
        expect(operations[0]).to.include.keys([
          "id",
          "type",
          "status",
          "created_at",
        ]);
      });
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/operations returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/nonexistent_owner/nonexistent_database/operations`;
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
