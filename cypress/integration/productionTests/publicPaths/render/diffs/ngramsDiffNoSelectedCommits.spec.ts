import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Diff page without selected commits";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notBeVisible = newShouldArgs("not.be.visible");

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
      notBeVisible,
    ),
    newExpectation(
      "should not show diff summary",
      "[data-cy=commit-diff-summary]",
      notBeVisible,
    ),
    newExpectation(
      "should show select commits message",
      "[data-cy=diff-layout-no-diff]",
      beVisible,
    ),
    newExpectation(
      "should not show diff table list",
      "[data-cy=diff-table-list]",
      notBeVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
