const apiVersion = "v1alpha1";
const repoOwner = "automated_testing";
const repoName = "corona-virus";
const defaultBranch = "master";
const otherBranch = "add-case-details";
const defaultQuery = "SHOW TABLES;";
const selectQuery = "SELECT * FROM `places` LIMIT 5;";
const badQuery = "heatdome";

describe("API returns 404 for invalid endpoints", () => {
  it("gets 404 responses from non-existant endpoints", () => {
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

describe(`API returns query results for '${defaultQuery}' from ${defaultBranch} without branch or query specified`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains the correct query metadata in the response body", () => {
    cy.request({ url: earl })
      .its("body.sql_query")
      .should("equal", `${defaultQuery}`);
    cy.request({ url: earl })
      .its("body.repository_owner")
      .should("equal", `${repoOwner}`);
    cy.request({ url: earl })
      .its("body.repository_name")
      .should("equal", `${repoName}`);
    cy.request({ url: earl })
      .its("body.commit_ref")
      .should("equal", `${defaultBranch}`);
    cy.request({ url: earl })
      .its("body.query_execution_status")
      .should("equal", "Success");
    cy.request({ url: earl })
      .its("body.query_execution_message")
      .should("equal", "");
  });
  it("contains the correct query result schema in the response body", () => {
    cy.request({ url: earl })
      .its("body.schema")
      .should("deep.equal", [
        {
          columnName: "Table",
          columnType: "String",
          isPrimaryKey: false,
        },
      ]);
  });
  it("contains the correct query result rows in the response body", () => {
    cy.request({ url: earl })
      .its("body.rows")
      .should("deep.equal", [
        { Table: "case_details" },
        { Table: "cases" },
        { Table: "cases_by_age_range" },
        { Table: "cases_by_age_sex" },
        { Table: "cases_by_sex" },
        { Table: "characteristics_age" },
        { Table: "characteristics_case_severity" },
        { Table: "characteristics_comorbid_condition" },
        { Table: "characteristics_occupation" },
        { Table: "characteristics_onset_date_range" },
        { Table: "characteristics_province" },
        { Table: "characteristics_sex" },
        { Table: "characteristics_wuhan_exposed" },
        { Table: "current" },
        { Table: "current_cases" },
        { Table: "current_deaths" },
        { Table: "current_recovered" },
        { Table: "deaths_by_age_range" },
        { Table: "deaths_by_age_sex" },
        { Table: "deaths_by_sex" },
        { Table: "mortality_rate_by_age_range" },
        { Table: "mortality_rate_by_age_sex" },
        { Table: "mortality_rate_by_sex" },
        { Table: "mortality_rates" },
        { Table: "places" },
        { Table: "time_series" },
      ]);
  });
});

describe(`API returns query results for '${defaultQuery}' from branch ${otherBranch} without query specified`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}/${otherBranch}`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains the correct query metadata in the response body", () => {
    cy.request({ url: earl })
      .its("body.sql_query")
      .should("equal", `${defaultQuery}`);
    cy.request({ url: earl })
      .its("body.repository_owner")
      .should("equal", `${repoOwner}`);
    cy.request({ url: earl })
      .its("body.repository_name")
      .should("equal", `${repoName}`);
    cy.request({ url: earl })
      .its("body.commit_ref")
      .should("equal", `${otherBranch}`);
    cy.request({ url: earl })
      .its("body.query_execution_status")
      .should("equal", "Success");
    cy.request({ url: earl })
      .its("body.query_execution_message")
      .should("equal", "");
  });
  it("contains the correct query result schema in the response body", () => {
    cy.request({ url: earl })
      .its("body.schema")
      .should("deep.equal", [
        {
          columnName: "Table",
          columnType: "String",
          isPrimaryKey: false,
        },
      ]);
  });
  it("contains the correct query result rows in the response body", () => {
    cy.request({ url: earl })
      .its("body.rows")
      .should("deep.equal", [
        { Table: "case_details" },
        { Table: "cases" },
        { Table: "characteristics_age" },
        { Table: "characteristics_case_severity" },
        { Table: "characteristics_comorbid_condition" },
        { Table: "characteristics_occupation" },
        { Table: "characteristics_onset_date_range" },
        { Table: "characteristics_province" },
        { Table: "characteristics_sex" },
        { Table: "characteristics_wuhan_exposed" },
        { Table: "current" },
        { Table: "current_cases" },
        { Table: "current_deaths" },
        { Table: "current_recovered" },
        { Table: "mortality_rates" },
        { Table: "places" },
        { Table: "time_series" },
      ]);
  });
});

describe(`API returns query results for '${selectQuery}' from ${defaultBranch} without branch specified`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}?q=${encodeURI(
    selectQuery,
  )}`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains the correct query metadata in the response body", () => {
    cy.request({ url: earl })
      .its("body.sql_query")
      .should("equal", `${selectQuery}`);
    cy.request({ url: earl })
      .its("body.repository_owner")
      .should("equal", `${repoOwner}`);
    cy.request({ url: earl })
      .its("body.repository_name")
      .should("equal", `${repoName}`);
    cy.request({ url: earl })
      .its("body.commit_ref")
      .should("equal", `${defaultBranch}`);
    cy.request({ url: earl })
      .its("body.query_execution_status")
      .should("equal", "Success");
    cy.request({ url: earl })
      .its("body.query_execution_message")
      .should("equal", "");
  });
  it("contains the correct query result schema in the response body", () => {
    cy.request({ url: earl })
      .its("body.schema")
      .should("deep.equal", [
        {
          columnName: "place_id",
          columnType: "BigInt",
          isPrimaryKey: false,
        },
        {
          columnName: "province_state",
          columnType: "String",
          isPrimaryKey: false,
        },
        {
          columnName: "country_region",
          columnType: "String",
          isPrimaryKey: false,
        },
        {
          columnName: "latitude",
          columnType: "Double",
          isPrimaryKey: false,
        },
        {
          columnName: "longitude",
          columnType: "Double",
          isPrimaryKey: false,
        },
      ]);
  });
  it("contains the correct query result rows in the response body", () => {
    cy.request({ url: earl })
      .its("body.rows")
      .should("deep.equal", [
        {
          place_id: "1",
          province_state: "Hubei",
          country_region: "China",
          latitude: "30.9756",
          longitude: "112.2707",
        },
        {
          place_id: "2",
          province_state: "Guangdong",
          country_region: "China",
          latitude: "23.3417",
          longitude: "113.4244",
        },
        {
          place_id: "3",
          province_state: "Henan",
          country_region: "China",
          latitude: "33.882",
          longitude: "113.61399999999999",
        },
        {
          place_id: "4",
          province_state: "Hunan",
          country_region: "China",
          latitude: "27.6104",
          longitude: "111.7088",
        },
        {
          place_id: "5",
          province_state: "Jiangxi",
          country_region: "China",
          latitude: "27.614",
          longitude: "115.7221",
        },
      ]);
  });
});

describe(`API returns query error for invalid query '${badQuery}'`, () => {
  const earl = `/api/${apiVersion}/${repoOwner}/${repoName}?q=${encodeURI(
    badQuery,
  )}`;
  it("gets a success response from the API", () => {
    cy.request({ url: earl }).its("status").should("equal", 200);
  });
  it("contains the correct query metadata in the response body", () => {
    cy.request({ url: earl })
      .its("body.sql_query")
      .should("equal", `${badQuery}`);
    cy.request({ url: earl })
      .its("body.repository_owner")
      .should("equal", `${repoOwner}`);
    cy.request({ url: earl })
      .its("body.repository_name")
      .should("equal", `${repoName}`);
    cy.request({ url: earl })
      .its("body.commit_ref")
      .should("equal", `${defaultBranch}`);
    cy.request({ url: earl })
      .its("body.query_execution_status")
      .should("equal", "Error");
    cy.request({ url: earl })
      .its("body.query_execution_message")
      .should(
        "equal",
        `query error: Error parsing SQL: syntax error at position ${
          badQuery.length + 1
        } near '${badQuery}'.`,
      );
  });
});
