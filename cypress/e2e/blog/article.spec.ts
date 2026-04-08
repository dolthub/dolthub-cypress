import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { testTimWeeklyUpdate } from "@utils/sharedTests/blog";
import {
  shouldBeVisible,
  shouldNotBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Blog article page";
const currentBlog = "2020-03-06-so-you-want-git-for-data";
const currentPage = `/blog/${currentBlog}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    shouldBeVisible("blog-post"),
    newExpectation(
      "should have blog home link at top and bottom",
      "[data-cy=blog-home-back-link]",
      newShouldArgs("exist.and.have.length", 2),
    ),
    newExpectation(
      "should have header with title",
      "[data-cy=blog-post] header h1",
      beVisible,
    ),
    newExpectation(
      "should have header with time",
      "[data-cy=blog-post] header time",
      beVisible,
    ),
    shouldBeVisible("blog-tags"),
    shouldBeVisible("blog-post-text"),
    shouldBeVisible("blog-share-widget"),
    ...testTimWeeklyUpdate,
  ];

  const desktopTests = [shouldBeVisible("tag-nav"), ...tests];
  const mobileTests = [shouldNotBeVisible("tag-nav"), ...tests];

  const devices = allDevicesForSignedOut(pageName, desktopTests, mobileTests);
  runTestsForDevices({
    currentPage,
    devices,
  });
});
