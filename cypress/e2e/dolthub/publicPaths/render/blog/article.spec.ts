import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Blog article page";
const currentBlog = "2020-03-06-so-you-want-git-for-data";
const currentPage = Cypress.env("LOCAL_BLOG")
  ? `/${currentBlog}`
  : `/blog/${currentBlog}`;
const skip = !!Cypress.env("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const testBlogArticle = [
    newExpectation("should have blog post", "[data-cy=blog-post]", beVisible),
    newExpectation(
      "should have blog home link at top and bottom",
      "[data-cy=blog-home-back-link]",
      newShouldArgs("exist.and.have.length", 2),
    ),
    newExpectation(
      "should have header with title",
      "[data-cy=blog-post] > header h1",
      beVisible,
    ),
    newExpectation(
      "should have header with time",
      "[data-cy=blog-post] > header time",
      beVisible,
    ),
    newExpectation(
      "should have blog post text",
      "[data-cy=blog-post-text]",
      beVisible,
    ),
    newExpectation(
      "should have share widget",
      "[data-cy=blog-share-widget]",
      beVisible,
    ),
  ];

  const devices = allDevicesForSignedOut(
    pageName,
    testBlogArticle,
    testBlogArticle,
  );
  runTestsForDevices({ currentPage, devices, skip });
});
