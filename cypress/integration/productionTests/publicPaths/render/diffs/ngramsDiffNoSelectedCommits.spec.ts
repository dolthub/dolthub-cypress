import {
  newExpectation,
  newShouldArgs,
  runTestsForDevices,
} from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";

const pageName = "Diff page without selected commits";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should show back to repo button",
      "[data-cy=diffs-back-to-repo-button]",
      beVisible,
    ),
    newExpectation(
      "should show diff selector",
      "[data-cy=diff-selector]",
      beVisible,
    ),
    newExpectation(
      "should show select commits message",
      "[data-cy=diff-layout-no-diff]",
      beVisible,
    ),
    newExpectation(
      "should not show diff table list",
      "[data-cy=diff-table-list]",
      newShouldArgs("not.be.visible"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
