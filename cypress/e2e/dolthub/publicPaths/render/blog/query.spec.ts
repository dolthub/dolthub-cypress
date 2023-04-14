import { testBlogIndexNoSearch, testSearched } from "@sharedTests/blog";
import { desktopDevicesForSignedOut } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { gatsbyServerBuildErrors } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Blog list page with query";
const query = "figma of databases video";
const currentPage = Cypress.env("LOCAL_BLOG")
  ? `/?q=${query}`
  : `/blog/?q=${query}`;
const skip = !!Cypress.env("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  // TODO: This error comes from fetching github stars for the navbar. We should fix eventually
  it("should ignore Gatsby server error", () => {
    cy.ignoreUncaughtErrors(gatsbyServerBuildErrors);
  });
  const clearSearchClickFlow = newClickFlow("[data-cy=blog-search-clear]", [
    newExpectation(
      "should have blank search input after clear",
      "[data-cy=blog-search-input]",
      newShouldArgs("be.visible.and.have.value", ""),
    ),
  ]);

  const tests = [
    newExpectation(
      "should have featured blogs",
      "[data-cy=featured-blogs]",
      beVisible,
    ),
    ...testSearched(
      query,
      "DoltHub is the Figma of Databases Video",
      "2022-01-25-figma-of-databases-video/",
    ),
    newExpectationWithClickFlows(
      "should clear search",
      "[data-cy=blog-search-clear]",
      beVisible,
      [clearSearchClickFlow],
    ),
    newExpectation(
      "should have blank search input after clear",
      "[data-cy=blog-search-input]",
      newShouldArgs("be.visible.and.have.value", ""),
    ),
    ...testBlogIndexNoSearch,
  ];

  // TODO: Fix mobile navbar tests
  const devices = desktopDevicesForSignedOut(pageName, tests);
  runTestsForDevices({ currentPage, devices, skip });

  it("should ignore Gatsby server error", () => {
    cy.ignoreUncaughtErrors(gatsbyServerBuildErrors);
  });
});
