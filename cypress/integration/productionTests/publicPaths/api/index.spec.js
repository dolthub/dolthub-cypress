describe("API returns 404 for invalid endpoints", function () {
    it("gets 404 responses from non-existant endpoints", function () {
        cy.request({
            url: '/api/',
            failOnStatusCode: false,
        }).its('status')
            .should('equal', 404);
        cy.request({
            url: '/api/0.1',
            failOnStatusCode: false,
        }).its('status')
            .should('equal', 404);
        cy.request({
            url: '/api/0.1/Liquidata',
            failOnStatusCode: false,
        }).its('status')
            .should('equal', 404);
    });
});

describe("API returns query results for 'SHOW TABLES;' from master without branch or query specified", function () {
    it("gets a success response from the API", function () {
        cy.request({
            url: '/api/0.1/Liquidata/ip-to-country',
        })
            .its('status')
            .should('equal', 200)
    });
    it("contains the query string 'SHOW TABLES;' in the response body", function () {
        cy.request({
            url: '/api/0.1/Liquidata/ip-to-country',
        })
            .its('body.sql_query')
            .should('equal', "SHOW TABLES;")
    });
});