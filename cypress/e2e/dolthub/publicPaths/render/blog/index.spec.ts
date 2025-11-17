import { testBlogIndexNoSearch } from "@sharedTests/blog";
import { allDevicesForSignedOut } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithTypeString,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Blog list page";
const currentPage = Cypress.env("LOCAL_BLOG") ? "/" : "/blog/";
const skip = !!Cypress.env("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const query1 = "Dolt and Knex.js";
  // const query2 = "wikipedia ngrams";

  // const clearSearchClickFlow = newClickFlow("[data-cy=blog-search-clear]", [
  //   newExpectation(
  //     "should have blank search input after clear",
  //     "[data-cy=blog-search-input]",
  //     newShouldArgs("be.visible.and.have.value", ""),
  //   ),
  // ]);

  const tests = [
    newExpectation(
      "should have featured blogs",
      "[data-cy=featured-blogs]",
      beVisible,
    ),
    newExpectation(
      "should have list of blog articles",
      "[data-cy=blog-list] > li:first",
      beVisible,
    ),
    newExpectation(
      "should have header of first blog excerpt",
      "[data-cy=blog-list] > li:first header",
      beVisible,
    ),
    newExpectation(
      "should have details of first blog excerpt",
      "[data-cy=blog-list] > li:first [data-cy=blog-excerpt]",
      beVisible,
    ),
    newExpectationWithTypeString(
      "should have blank search input",
      "[data-cy=blog-search-input]",
      newShouldArgs("be.visible.and.have.value", ""),
      { value: query1, withWarmup: false },
    ),
    // newExpectationWithTypeString(
    //   "should have filled search input",
    //   "[data-cy=blog-search-input]",
    //   newShouldArgs("be.visible.and.have.value", query1),
    //   { value: `{enter}`, skipClear: true },
    // ),
    // ...testSearched(
    //   query1,
    //   "Getting Started with Dolt and Knex.js",
    //   "2023-09-27-dolt-and-knexjs",
    //   1,
    // ),
    // newExpectationWithTypeString(
    //   "should change input",
    //   "[data-cy=blog-search-input]",
    //   newShouldArgs("be.visible.and.have.value", query1),
    //   { value: `${query2}{enter}` },
    // ),
    // ...testSearched(
    //   query2,
    //   "Maintained Wikipedia ngrams dataset in Dolt",
    //   "2019-12-04-maintained-wikipedia-ngrams-dataset",
    // ),
    // newExpectationWithClickFlow(
    //   "should have searched and cleared",
    //   "[data-cy=blog-search-clear]",
    //   beVisible,
    //   clearSearchClickFlow,
    // ),
    ...testBlogIndexNoSearch,
  ];

  const desktopTests = [
    ...tests,
    newExpectation(
      "should have footer of first blog excerpt",
      "[data-cy=blog-list] > li:first [data-cy=blog-metadata]",
      beVisible,
    ),
  ];

  const mobileTests = [
    ...tests,
    newExpectation(
      "should have footer of first blog excerpt",
      "[data-cy=blog-list] > li:first [data-cy=blog-metadata-mobile]",
      beVisible,
    ),
  ];

  const devices = allDevicesForSignedOut(
    pageName,
    desktopTests,
    mobileTests,
    true,
  );
  runTestsForDevices({
    currentPage,
    devices,
    skip,
    forGatsby: true,
  });
});
