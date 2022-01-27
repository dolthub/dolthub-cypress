import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Diff page without selected commits";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should show repo breadcrumbs",
      "[data-cy=repo-breadcrumbs]",
      beVisible,
    ),
    newExpectation(
      "should show back to commit log button",
      "[data-cy=back-to-commits]",
      beVisible,
      true,
    ),
    newExpectation(
      "should show diff selector",
      "[data-cy=diff-selector]",
      beVisible,
      true,
    ),
    newExpectation(
      "should show two form selects",
      "[data-cy=form-select]",
      newShouldArgs("be.visible.and.have.length", 2),
      true,
    ),
    newExpectation(
      "should not have viewing message",
      "[data-cy=viewing-message]",
      notExist,
      true,
    ),
    newExpectation(
      "should not show commit diff summary",
      "[data-cy=commit-diff-summary]",
      notExist,
    ),
    newExpectation(
      "should not show diff table list summaries",
      "[data-cy=diff-table-list-summaries]",
      notExist,
    ),
    newExpectation(
      "should show select commits message",
      "[data-cy=diff-layout-no-diff]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
