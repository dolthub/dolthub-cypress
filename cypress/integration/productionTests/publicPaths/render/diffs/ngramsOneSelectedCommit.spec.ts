import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Diff page with one selected commit";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentFromCommit = "q2l59dla1vak1fp0gp2me451bq9sli2k";
const branch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

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
      "should show two form selects",
      "[data-cy=form-select]",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should not have viewing message",
      "[data-cy=viewing-message]",
      newShouldArgs("not.exist"),
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
      newShouldArgs("be.visible.and.have.length", 3),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
