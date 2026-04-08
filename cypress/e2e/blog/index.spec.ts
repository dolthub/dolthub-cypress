import {
  testBlogIndexNoSearch,
  testSearched,
  testTimWeeklyUpdate,
} from "@sharedTests/blog";
import { allDevicesForSignedOut } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithTypeString,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldNotBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Blog list page";
const currentPage = "/blog/";

const query1 = "Dolt and Knex.js";
const query2 = "wikipedia ngrams";

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
    shouldBeVisible("featured-blogs"),
    newExpectation(
      "should have list of blog articles",
      "[data-cy=blog-list] > li:first",
      beVisible,
    ),
    newExpectation(
      "should have header of first blog excerpt",
      "[data-cy=blog-list] > li:first h2",
      beVisible,
    ),
    newExpectation(
      "should have details of first blog excerpt",
      "[data-cy=blog-list] > li:first [data-cy=blog-excerpt]",
      beVisible,
    ),
    newExpectation(
      "should have blank search input",
      "[data-cy=blog-search-input]",
      newShouldArgs("be.visible.and.have.value", ""),
    ),
    ...testBlogIndexNoSearch,

    newExpectationWithTypeString(
      "should type in search input",
      "[data-cy=blog-search-input]",
      beVisible,
      { value: query1, withWarmup: true },
    ),
    ...testSearched(
      query1,
      "Getting Started with Dolt and Knex.js",
      "2023-09-27-dolt-and-knexjs",
      1,
    ),
    newExpectationWithTypeString(
      "should change input",
      "[data-cy=blog-search-input]",
      newShouldArgs("be.visible.and.have.value", query1),
      { value: query2 },
    ),
    ...testSearched(
      query2,
      "Maintained Wikipedia ngrams dataset in Dolt",
      "2019-12-04-maintained-wikipedia-ngrams-dataset",
    ),
    newExpectationWithClickFlow(
      "should have searched and cleared",
      "[data-cy=blog-search-clear]",
      beVisible,
      clearSearchClickFlow,
    ),

    newExpectation(
      "should have footer of first blog excerpt",
      "[data-cy=blog-list] > li:first [data-cy=blog-metadata]",
      beVisible,
    ),
    ...testTimWeeklyUpdate,
  ];

  const desktopTests = [
    shouldBeVisible("tag-nav"),
    shouldNotBeVisible("blog-filter-button"),
    shouldBeVisible("featured-tags"),
    ...tests,
  ];
  const mobileTests = [
    shouldBeVisible("blog-filter-button"),
    shouldNotBeVisible("tag-nav"),
    shouldNotBeVisible("featured-tags"),
    ...tests,
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
  });
});
