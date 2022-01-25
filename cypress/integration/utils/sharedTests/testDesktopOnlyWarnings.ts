import { newExpectation, newShouldArgs } from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  notBeVisible,
} from "./sharedFunctionsAndVariables";

export const testRepoWithDocsMobile: Tests = [
  newExpectation(
    "should show the doc description",
    "[data-cy=description]",
    beVisible,
  ),
  newExpectation(
    "should not show the edit description button for mobile",
    "[data-cy=edit-description-button]",
    notBeVisible,
  ),
  newExpectation(
    "should show the doc list",
    "[data-cy=repo-docs-list]",
    beVisible,
  ),
  newExpectation(
    "should show the doc markdown",
    "data-cy=repo-doc-markdown]",
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

export const testDesktopOnlyWarnings = (
  currentPage: string,
  hasDocs: boolean,
): Tests => {
  const pageName = currentPage.split("/")[3];
  const notDocPage = !(pageName === "doc")
    ? [
        newExpectation(
          "should show not accessible on mobile info",
          "data-cy=[not-accessible-on-mobile]",
          beVisibleAndContain(""),
        ),
      ]
    : [];
  const docsTests = hasDocs
    ? testRepoWithDocsMobile
    : testRepoWithoutDocsMobile;
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
