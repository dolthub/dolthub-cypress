import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Merged pull diff page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPullId = "1";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls/${currentPullId}/compare`;

const skip = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should show diff summary",
      "[data-cy=commit-diff-summary]",
      beVisible,
    ),
    newExpectation(
      "should show table list",
      "[data-cy=diff-table-list]",
      beVisible,
    ),
    newExpectation(
      "should show table list items",
      "[data-cy=diff-table-list] > li",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectation(
      "should show diff selector",
      "[data-cy=diff-selector]",
      newShouldArgs(
        "be.visible.and.contain",
        "Showing changes from all commits",
      ),
    ),
    newExpectation(
      "should not find 404 page",
      "[data-cy=pull-404-page]",
      newShouldArgs("not.be.visible"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices, skip });
});
