import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";
import { testMobileRepoHeaderNav } from "./repoHeaderNav";
import {
  beVisible,
  beVisibleAndContain,
  notExist,
} from "./sharedFunctionsAndVariables";

export const testEmptyRepo = (hasBranch: boolean): Tests => {
  const pushCommitDescription = hasBranch ? "" : "not ";
  const pushCommitExist = hasBranch ? beVisible : notExist;
  return [
    newExpectation(
      "should have database Get Started section",
      "[data-cy=repo-empty-get-started]",
      beVisible,
    ),
    newExpectation(
      `should ${pushCommitDescription}have database Push a commit section`,
      "[data-cy=repo-empty-push-a-commit]",
      pushCommitExist,
    ),
    newExpectationWithScrollIntoView(
      "should have upload file section",
      "[data-cy=file-upload-fileupload-branch-link]",
      beVisible,
      true,
    ),
    newExpectationWithScrollIntoView(
      "should have sql section",
      "[data-cy=sql-query-create-table]",
      beVisible,
      true,
    ),
    newExpectationWithScrollIntoView(
      "should have spreadsheet section",
      "[data-cy=file-upload-spreadsheet-branch-link]",
      beVisible,
      true,
    ),
    newExpectationWithScrollIntoView(
      "should have Create new database section",
      "[data-cy=repo-empty-create-new-repo]",
      beVisible,
      true,
    ),
    newExpectationWithScrollIntoView(
      "should have Push existing database section",
      "[data-cy=repo-empty-push-local-repo]",
      beVisible,
      true,
    ),
  ];
};
export const testRepoWithDocsMobile: Tests = [
  newExpectation(
    "should show the doc description",
    "[data-cy=description]",
    beVisible,
  ),
  newExpectation(
    "should not show the edit description button for mobile",
    "[data-cy=edit-description-button]",
    notExist,
  ),
  newExpectation(
    "should show the doc list",
    "[data-cy=repo-docs-list]",
    beVisible,
  ),
  newExpectation(
    "should show the doc markdown",
    "[data-cy=repo-doc-markdown]",
    beVisible,
  ),
];
export const testRepoWithoutDocsMobile: Tests = [
  newExpectation(
    "should show the no docs message",
    "[data-cy=no-docs-msg]",
    beVisible,
  ),
  newExpectation(
    "should show no docs found",
    "[data-cy=no-docs-found]",
    beVisibleAndContain("No docs"),
  ),
  newExpectation(
    "should show add docs on desktop message",
    "[data-cy=add-docs-on-desktop]",
    beVisibleAndContain("visit this page on desktop to add a doc"),
  ),
  newExpectation(
    "should show add docs title",
    "[data-cy=adding-doc-title]",
    beVisibleAndContain("Adding a doc on DoltHub"),
  ),
  newExpectation(
    "should show adding doc steps",
    "[data-cy=add-doc-steps] > li",
    newShouldArgs("be.visible.and.have.length.of.at.least", 3),
  ),
];
function docsTestsFunc(hasDocs: boolean, hasData: boolean, hasBranch: boolean) {
  if (hasDocs) {
    return testRepoWithDocsMobile;
  }
  if (hasData) {
    return testRepoWithoutDocsMobile;
  }
  return testEmptyRepo(hasBranch);
}
export const testDesktopOnlyWarnings = (
  currentPage: string,
  hasDocs: boolean,
  hasBranch: boolean,
  hasData: boolean,
): Tests => {
  const pageName = currentPage.toString().split("/")[3];
  const notDocPage = !(pageName === "doc" || pageName === undefined)
    ? [
        newExpectation(
          `should show ${pageName} page not accessible on mobile info`,
          "[data-cy=not-accessible-on-mobile]",
          beVisibleAndContain(pageName),
        ),
      ]
    : [];
  const docsTests = docsTestsFunc(hasDocs, hasData, hasBranch);

  return [
    ...notDocPage,
    // test the better On Desktop part
    newExpectation(
      "should show the better on desktop information",
      "[data-cy=better-on-desktop]",
      beVisibleAndContain("Databases are best viewed on larger screens"),
    ),
    newExpectation(
      "should show the desktop screen pic",
      "[data-cy=desktop-screen]",
      beVisible,
    ),
    ...docsTests,
  ];
};

export const mobileTests = (
  currentOwner: string,
  currentRepo: string,
  currentPage: string,
  hasDocs: boolean,
  hasBranch: boolean,
  hasData = true,
): Tests => [
  ...testMobileRepoHeaderNav(currentOwner, currentRepo),
  ...testDesktopOnlyWarnings(currentPage, hasDocs, hasBranch, hasData),
];
