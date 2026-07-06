export {};

const apiVersion = "v2";
const repoOwner = "automated_testing";
const repoName = "corona-virus";
const defaultBranch = "master";
const defaultQuery = "SHOW TABLES;";
const selectQuery = "SELECT * FROM `places` ORDER BY place_id ASC LIMIT 5;";
const badQuery = "heatdome";

describe(`GET /${repoOwner}/${repoName}/sql runs a read-only query`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/sql?ref=${defaultBranch}&q=${encodeURIComponent(
    defaultQuery,
  )}`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains the correct query result status in the response body", () => {
    cy.request({ url: earl })
      .its("body.data.status")
      .should("equal", "success");
  });
  it("contains the correct query result columns in the response body", () => {
    cy.request({ url: earl })
      .its("body.data.columns")
      .then(columns => {
        expect(columns).to.have.length(1);
        expect(columns[0]).to.include({ name: "Tables_in_corona-virus" });
      });
  });
  it("contains the correct query result rows in the response body", () => {
    cy.request({ url: earl })
      .its("body.data.rows")
      .should("deep.include", ["places"])
      .and("deep.include", ["case_details"]);
  });
});

describe(`GET /${repoOwner}/${repoName}/sql runs a SELECT query`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/sql?ref=${defaultBranch}&q=${encodeURIComponent(
    selectQuery,
  )}`;
  it("contains the correct query result columns and rows in the response body", () => {
    cy.request({ url: earl })
      .its("body.data.columns")
      .then(columns => {
        expect(
          columns.map((column: { name: string }) => column.name),
        ).to.deep.equal([
          "place_id",
          "province_state",
          "country_region",
          "latitude",
          "longitude",
        ]);
      });
    cy.request({ url: earl }).its("body.data.rows").should("have.length", 5);
  });
});

describe(`POST /${repoOwner}/${repoName}/sql runs the same read-only query as the GET variant`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/sql`;
  it("gets a success response from the API", () => {
    cy.request({
      method: "POST",
      url: earl,
      body: { ref: defaultBranch, q: defaultQuery },
    })
      .its("status")
      .should("equal", 200);
  });
  it("contains the same result as the GET variant", () => {
    const getUrl = `${earl}?ref=${defaultBranch}&q=${encodeURIComponent(defaultQuery)}`;

    cy.request({ url: getUrl }).then(getResp => {
      cy.request({
        method: "POST",
        url: earl,
        body: { ref: defaultBranch, q: defaultQuery },
      }).then(postResp => {
        expect(postResp.body.data.status).to.equal(getResp.body.data.status);
        expect(postResp.body.data.columns).to.deep.equal(
          getResp.body.data.columns,
        );
        expect(postResp.body.data.rows).to.deep.equal(getResp.body.data.rows);
      });
    });
  });
});

describe(`GET /${repoOwner}/${repoName}/sql returns a query-level error for an invalid query`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/sql?ref=${defaultBranch}&q=${encodeURIComponent(
    badQuery,
  )}`;
  it("gets a 200 response from the API since this is a query-level, not transport-level, failure", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains the correct error status and message in the response body", () => {
    cy.request({ url: earl }).its("body.data.status").should("equal", "error");
    cy.request({ url: earl })
      .its("body.data.message")
      .should("contain", "query error");
  });
});

describe(`GET /${repoOwner}/${repoName}/sql without required params returns 400`, () => {
  const earl = `/api/${apiVersion}/databases/${repoOwner}/${repoName}/sql`;
  it("gets a 400 response from the API", () => {
    cy.request({ url: earl, failOnStatusCode: false })
      .its("status")
      .should("equal", 400);
  });
  it("contains the RFC 9457 problem details in the response body", () => {
    cy.request({ url: earl, failOnStatusCode: false })
      .its("body.code")
      .should("equal", "VALIDATION_FAILED");
  });
});

describe(`GET /nonexistent_owner/nonexistent_database/sql returns 404`, () => {
  const earl = `/api/${apiVersion}/databases/nonexistent_owner/nonexistent_database/sql?ref=${defaultBranch}&q=${encodeURIComponent(
    defaultQuery,
  )}`;
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
