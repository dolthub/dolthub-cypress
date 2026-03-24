const apiVersion = "v1alpha1";
const repoOwner = "automated_testing";
const repoName = "corona-virus";

describe(`GET /${repoOwner}/${repoName}/jobs returns jobs`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}/jobs`;
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
  it("contains an array of jobs", () => {
    cy.request({ url: earl })
      .its("body.jobs")
      .should("be.an", "array")
      .and("have.length.above", 0);
  });
  it("contains jobs with the expected fields", () => {
    cy.request({ url: earl })
      .its("body.jobs")
      .then(jobs => {
        expect(jobs[0]).to.include.keys([
          "job_id",
          "job_type",
          "status",
          "created_at",
          "creator",
        ]);
      });
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/jobs returns 400`, () => {
  const earl = `/api/${apiVersion}/nonexistent_owner/nonexistent_database/jobs`;
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
