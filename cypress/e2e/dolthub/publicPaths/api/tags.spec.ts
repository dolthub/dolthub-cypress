export {};

const apiVersion = "v1alpha1";
const repoOwner = "automated_testing";
const repoName = "repo_with_tags_and_branches";

describe(`GET /${repoOwner}/${repoName}/tags returns tags`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}/tags`;
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
  it("contains an array of tags", () => {
    cy.request({ url: earl })
      .its("body.tags")
      .should("be.an", "array")
      .and("have.length.above", 10);
  });
  it("contains tags with the expected fields", () => {
    cy.request({ url: earl })
      .its("body.tags")
      .then(tags => {
        expect(tags[0]).to.include.keys([
          "tag_name",
          "tag_description",
          "tagged_at",
        ]);
      });
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/tags returns 400`, () => {
  const earl = `/api/${apiVersion}/nonexistent_owner/nonexistent_database/tags`;
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
