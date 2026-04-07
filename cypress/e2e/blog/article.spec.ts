import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { testTimWeeklyUpdate } from "@utils/sharedTests/blog";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Blog article page";
const currentBlog = "2020-03-06-so-you-want-git-for-data";
const currentPage = Cypress.expose("LOCAL_BLOG")
  ? `/${currentBlog}`
  : `/blog/${currentBlog}`;
const skip = !!Cypress.expose("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const testBlogArticle = [
    shouldBeVisible("blog-post"),
    newExpectation(
      "should have blog home link at top and bottom",
      "[data-cy=blog-home-back-link]",
      newShouldArgs("exist.and.have.length", 2),
    ),
    shouldBeVisible("tag-nav"),
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
    shouldBeVisible("blog-post-text"),
    shouldBeVisible("blog-share-widget"),
    ...testTimWeeklyUpdate,
  ];

  const devices = allDevicesForSignedOut(
    pageName,
    testBlogArticle,
    testBlogArticle,
  );
  runTestsForDevices({
    currentPage,
    devices,
    skip,
  });
});
