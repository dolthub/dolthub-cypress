export {};

const apiVersion = "v1alpha1";
const repoName = "corona-virus";

describe("API returns 404 for invalid endpoints", () => {
  it("gets 404 responses from non-existent endpoints", () => {
    cy.request({
      url: `/api/`,
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 404);
    cy.request({
      url: `/api/${apiVersion}`,
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 404);
    cy.request({
      url: `/api/${apiVersion}/${repoName}`,
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 404);
  });
});
