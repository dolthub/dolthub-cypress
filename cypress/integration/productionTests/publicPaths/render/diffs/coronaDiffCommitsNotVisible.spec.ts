import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Diff page with commits not visible in selectors";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentFromCommit = "ipqhluv35od2ld6t00k88mgd22mtsnmh";
const branch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should show back to repo link",
      "[data-cy=back-to-repo-link]",
      beVisible,
    ),
    newExpectation(
      "should show diff selector",
      "[data-cy=diff-selector]",
      beVisible,
    ),
    newExpectation(
      "should not show any form selects",
      "[data-cy=form-select]",
      notExist,
    ),
    newExpectation(
      "should have viewing message",
      "[data-cy=viewing-message]",
      newShouldArgs("be.visible.and.contain", currentFromCommit),
    ),
    newExpectation(
      "should show diff summary",
      "[data-cy=commit-diff-summary]",
      beVisible,
    ),
    newExpectation(
      "should show view type selector",
      "[data-cy=view-type-selector]",
      beVisible,
    ),
    newExpectation(
      "should show diff table list",
      "[data-cy=diff-table-list]",
      beVisible,
    ),
    newExpectation(
      "should show diff table list items",
      "[data-cy=diff-table-list] > li",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
