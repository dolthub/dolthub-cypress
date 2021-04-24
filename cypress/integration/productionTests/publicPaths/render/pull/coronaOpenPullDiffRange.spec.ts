import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Open pull diff range page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPullId = "5";
const currentFromCommit = "m7baiv613lndd6qbi9c99t9e3aq3d2jp";
const currentToCommit = "0ae58dhtk4rdn56dafngtsgfe490clbs";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls/${currentPullId}/compare/${currentFromCommit}...${currentToCommit}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should not find 404 page",
      "[data-cy=pull-404-page]",
      newShouldArgs("not.exist"),
    ),
    newExpectation(
      "should show diff selector",
      "[data-cy=diff-selector]",
      newShouldArgs("be.visible.and.contain", "Showing changes from 1 commit"),
    ),
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
      newShouldArgs("be.visible.and.have.length", 2),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
