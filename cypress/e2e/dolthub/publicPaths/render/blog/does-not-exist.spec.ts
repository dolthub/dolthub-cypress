import { macbook15 } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Blog 404 page for path that does not exist";
const currentPath = "/does-not-exist";
const currentPage = Cypress.env("LOCAL_BLOG")
  ? `/${currentPath}`
  : `/blog/${currentPath}`;
const skip = !!Cypress.env("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should render 404 page with title",
      "[data-cy=404-page]",
      newShouldArgs("be.visible.and.contain", "Page not found"),
    ),
    newExpectation(
      "should render 404 code block",
      "[data-cy=code-404-block]",
      beVisible,
    ),
    newExpectation(
      "should render back to blog home button",
      "[data-cy=blog-home-button]",
      beVisible,
    ),
  ];

  const devices = [macbook15(pageName, tests)];

  runTestsForDevices({
    currentPage,
    devices,
    skip,
    ignoreUncaughtErrors: true,
  });
});
