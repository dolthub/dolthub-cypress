import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testSidecar } from "../../../../utils/sharedTests/sidecar";

const pageName = "Blog list page";
const currentPage = Cypress.env("LOCAL_BLOG") ? "/" : "/blog/";
const skip = !!Cypress.env("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  // const exist = newShouldArgs("exist");

  const testBlogExceptDetails = [
    newExpectation(
      "should have list of blog articles",
      "[data-cy=blog-list] > li:first",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have header of first blog excerpt",
      "[data-cy=blog-list] > li:first > header",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have details of first blog excerpt",
      "[data-cy=blog-list] > li:first > main",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have footer of first blog excerpt",
      "[data-cy=blog-list] > li:first > footer",
      beVisible,
      skip,
    ),
  ];

  const tests = [...testBlogExceptDetails, ...testSidecar(beVisible, skip)];
  // const mobileTests = [...testBlogExceptDetails, ...testSidecar(exist, skip)];

  // const devices = allDevicesForSignedOut(pageName, tests, mobileTests);
  const devices = desktopDevicesForSignedOut(pageName, tests);
  runTestsForDevices({ currentPage, devices });
});
