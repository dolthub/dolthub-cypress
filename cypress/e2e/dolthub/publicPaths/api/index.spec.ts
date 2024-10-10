const apiVersion = "v1alpha1";
const repoOwner = "automated_testing";
const repoName = "corona-virus";
const defaultBranch = "master";
const otherBranch = "add-case-details";
const defaultQuery = "SHOW TABLES;";
const selectQuery = "SELECT * FROM `places` ORDER BY place_id ASC LIMIT 5;";
const badQuery = "heatdome";

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
          columnName: "Tables_in_dolt",
          columnType: "longtext",
        },
      ]);
  });
  it("contains the correct query result rows in the response body", () => {
    cy.request({ url: earl })
      .its("body.rows")
      .should("deep.equal", [
        { Tables_in_dolt: "case_details" },
        { Tables_in_dolt: "cases" },
        { Tables_in_dolt: "cases_by_age_range" },
        { Tables_in_dolt: "cases_by_age_sex" },
        { Tables_in_dolt: "cases_by_sex" },
        { Tables_in_dolt: "characteristics_age" },
        { Tables_in_dolt: "characteristics_case_severity" },
        { Tables_in_dolt: "characteristics_comorbid_condition" },
        { Tables_in_dolt: "characteristics_occupation" },
        { Tables_in_dolt: "characteristics_onset_date_range" },
        { Tables_in_dolt: "characteristics_province" },
        { Tables_in_dolt: "characteristics_sex" },
        { Tables_in_dolt: "characteristics_wuhan_exposed" },
        { Tables_in_dolt: "current" },
        { Tables_in_dolt: "current_cases" },
        { Tables_in_dolt: "current_deaths" },
        { Tables_in_dolt: "current_recovered" },
        { Tables_in_dolt: "deaths_by_age_range" },
        { Tables_in_dolt: "deaths_by_age_sex" },
        { Tables_in_dolt: "deaths_by_sex" },
        { Tables_in_dolt: "mortality_rate_by_age_range" },
        { Tables_in_dolt: "mortality_rate_by_age_sex" },
        { Tables_in_dolt: "mortality_rate_by_sex" },
        { Tables_in_dolt: "mortality_rates" },
        { Tables_in_dolt: "places" },
        { Tables_in_dolt: "time_series" },
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
          columnName: "Tables_in_dolt",
          columnType: "longtext",
        },
      ]);
  });
  it("contains the correct query result rows in the response body", () => {
    cy.request({ url: earl })
      .its("body.rows")
      .should("deep.equal", [
        { Tables_in_dolt: "case_details" },
        { Tables_in_dolt: "cases" },
        { Tables_in_dolt: "characteristics_age" },
        { Tables_in_dolt: "characteristics_case_severity" },
        { Tables_in_dolt: "characteristics_comorbid_condition" },
        { Tables_in_dolt: "characteristics_occupation" },
        { Tables_in_dolt: "characteristics_onset_date_range" },
        { Tables_in_dolt: "characteristics_province" },
        { Tables_in_dolt: "characteristics_sex" },
        { Tables_in_dolt: "characteristics_wuhan_exposed" },
        { Tables_in_dolt: "current" },
        { Tables_in_dolt: "current_cases" },
        { Tables_in_dolt: "current_deaths" },
        { Tables_in_dolt: "current_recovered" },
        { Tables_in_dolt: "mortality_rates" },
        { Tables_in_dolt: "places" },
        { Tables_in_dolt: "time_series" },
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
          columnType: "bigint",
        },
        {
          columnName: "province_state",
          columnType: "varchar(1023)",
        },
        {
          columnName: "country_region",
          columnType: "varchar(1023)",
        },
        {
          columnName: "latitude",
          columnType: "double",
        },
        {
          columnName: "longitude",
          columnType: "double",
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
