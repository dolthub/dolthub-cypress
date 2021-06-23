import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Blog list page";
const currentPage = Cypress.env("LOCAL_BLOG") ? "/" : "/blog/";
const skip = !!Cypress.env("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should have featured blogs",
      "[data-cy=featured-blogs]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have list of blog articles",
      "[data-cy=blog-list] > li:first",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have header of first blog excerpt",
      "[data-cy=blog-list] > li:first header",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have details of first blog excerpt",
      "[data-cy=blog-list] > li:first [data-cy=blog-excerpt]",
      beVisible,
      skip,
    ),
  ];

  const desktopTests = [
    ...tests,
    newExpectation(
      "should have footer of first blog excerpt",
      "[data-cy=blog-list] > li:first [data-cy=blog-metadata]",
      beVisible,
      skip,
    ),
  ];

  const mobileTests = [
    ...tests,
    newExpectation(
      "should have footer of first blog excerpt",
      "[data-cy=blog-list] > li:first [data-cy=blog-metadata-mobile]",
      beVisible,
      skip,
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, desktopTests, mobileTests);
  runTestsForDevices({ currentPage, devices });
});
