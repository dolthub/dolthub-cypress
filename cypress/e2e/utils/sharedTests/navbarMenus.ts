import { deviceDimensions, runTests } from "../index";
import {
  testMobileNavbar,
  testSignedInNavbar,
  testSignedOutNavbar,
} from "./navbar";

const products = [
  "dolt",
  "doltgresql",
  "doltlite",
  "dolthub",
  "doltlab",
  "dolt-workbench",
  "hosted-dolt",
];
const docs = ["dolt", "doltgresql", "doltlab"];

export function testNavbarMenus(currentPage: string, loggedIn = false) {
  if (loggedIn) {
    beforeEach(function skipWithoutCredentials() {
      cy.env(["TEST_USERNAME", "TEST_PASSWORD"]).then(credentials => {
        if (!credentials.TEST_USERNAME || !credentials.TEST_PASSWORD)
          this.skip();
      });
    });
  }
  const devices: Cypress.ViewportPreset[] = [
    "macbook-15",
    "ipad-2",
    "iphone-x",
  ];
  devices.forEach(device => {
    const isMobile = device !== "macbook-15";
    it(
      `opens and closes navbar menus on ${device}`,
      deviceDimensions[device],
      () => {
        cy.visitPage(currentPage, loggedIn);
        runTests({
          isMobile,
          tests: isMobile
            ? testMobileNavbar(loggedIn)
            : loggedIn
              ? testSignedInNavbar
              : testSignedOutNavbar,
        });
        if (isMobile) cy.get("[data-cy=mobile-navbar-menu-button]").click();

        const productsTrigger = isMobile
          ? "[data-cy=mobile-navbar-products]"
          : "[data-cy=navbar-products]";
        const docsTrigger = isMobile
          ? "[data-cy=mobile-navbar-docs]"
          : "[data-cy=navbar-docs-menu]";
        const openMenu = (selector: string) => {
          cy.get(selector).should("have.attr", "aria-expanded", "false");
          if (isMobile) {
            cy.get(selector).scrollIntoView({ offset: { top: -100, left: 0 } });
            cy.get(selector).click();
          } else cy.get(selector).trigger("mouseover");
          cy.get(selector).should("have.attr", "aria-expanded", "true");
        };
        const closeMenu = (selector: string) => {
          cy.get(selector).scrollIntoView({ offset: { top: -100, left: 0 } });
          cy.get(selector).click();
          cy.get(selector).should("have.attr", "aria-expanded", "false");
        };

        openMenu(productsTrigger);
        products.forEach(product => {
          cy.get(`[data-cy=nav-product-${product}]`).scrollIntoView({
            offset: { top: -100, left: 0 },
          });
          cy.get(`[data-cy=nav-product-${product}]`).should("be.visible");
        });
        cy.get("[data-cy=nav-product-dolthub]")
          .should("have.attr", "href")
          .and("match", new RegExp(`/${loggedIn ? "profile" : "signin"}$`));
        cy.get("[data-cy=nav-product-hosted-dolt] a")
          .last()
          .should(
            "have.attr",
            "href",
            "https://hosted.doltdb.com/create-deployment",
          );
        closeMenu(productsTrigger);
        cy.get("[data-cy=nav-product-dolt]").should("not.exist");

        openMenu(docsTrigger);
        docs.forEach(doc => {
          cy.get(
            `[data-cy=${isMobile ? "mobile-" : ""}nav-docs-${doc}]`,
          ).scrollIntoView({ offset: { top: -100, left: 0 } });
          cy.get(`[data-cy=${isMobile ? "mobile-" : ""}nav-docs-${doc}]`)
            .should("be.visible")
            .and("have.attr", "href");
        });
        closeMenu(docsTrigger);
        cy.get(`[data-cy=${isMobile ? "mobile-" : ""}nav-docs-dolt]`).should(
          "not.exist",
        );
        if (isMobile) {
          cy.get("[data-cy=mobile-navbar-close-button]").click();
          cy.get("[data-cy=mobile-navbar-links]").should("not.exist");
        }
      },
    );
  });
}
