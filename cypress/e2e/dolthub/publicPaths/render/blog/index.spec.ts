import { testBlogIndexNoSearch, testSearched } from "@sharedTests/blog";
import {
  desktopDevicesForSignedOut,
  mobileDevicesForSignedOut,
} from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Blog list page";
const currentPage = Cypress.env("LOCAL_BLOG") ? "/" : "/blog/";
const skip = !!Cypress.env("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const query1 = "figma of databases video";
  const query2 = "wikipedia ngrams";

  const searchClickFlow = newClickFlow(
    "",
    [
      ...testSearched(
        query1,
        "DoltHub is the Figma of Databases Video",
        "2022-01-25-figma-of-databases-video/",
      ),
      newExpectationWithTypeString(
        "should change input",
        "[data-cy=blog-search-input]",
        newShouldArgs("be.visible.and.have.value", query1),
        { value: `${query2}{enter}` },
      ),
      ...testSearched(
        query2,
        "Maintained Wikipedia ngrams dataset in Dolt",
        "2019-12-04-maintained-wikipedia-ngrams-dataset/",
      ),
    ],
    "[data-cy=blog-search-clear]",
  );

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
      { value: `${query1}{enter}`, skipClear: true },
    ),
    newExpectationWithClickFlows(
      "should have searched and cleared",
      "[data-cy=blog-search-clear]",
      beVisible,
      [searchClickFlow],
    ),
    newExpectation(
      "should have blank search input after clear",
      "[data-cy=blog-search-input]",
      newShouldArgs("be.visible.and.have.value", ""),
    ),
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

  // TODO: Fix mobile navbar tests
  const mobileTests = [
    ...tests,
    newExpectation(
      "should have footer of first blog excerpt",
      "[data-cy=blog-list] > li:first [data-cy=blog-metadata-mobile]",
      beVisible,
    ),
  ];

  const devices = desktopDevicesForSignedOut(pageName, desktopTests);
  const mobileDevices = mobileDevicesForSignedOut(pageName, mobileTests, true);
  runTestsForDevices({
    currentPage,
    devices: [...devices, ...mobileDevices],
    skip,
    ignoreUncaughtErrors: true,
  });
});
