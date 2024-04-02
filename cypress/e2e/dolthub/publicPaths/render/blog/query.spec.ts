import { testBlogIndexNoSearch, testSearched } from "@sharedTests/blog";
import { allDevicesForSignedOut } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Blog list page with query";
const query = "Dolt and Knex.js";
const currentPage = Cypress.env("LOCAL_BLOG")
  ? `/?q=${query}`
  : `/blog/?q=${query}`;
const skip = !!Cypress.env("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
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
      "Getting Started with Dolt and Knex.js",
      "2023-09-27-dolt-and-knexjs/",
    ),
    newExpectationWithClickFlow(
      "should clear search",
      "[data-cy=blog-search-clear]",
      beVisible,
      clearSearchClickFlow,
    ),
    newExpectation(
      "should have blank search input after clear",
      "[data-cy=blog-search-input]",
      newShouldArgs("be.visible.and.have.value", ""),
    ),
    ...testBlogIndexNoSearch,
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);
  runTestsForDevices({
    currentPage,
    devices,
    skip,
    forGatsby: true,
  });
});
