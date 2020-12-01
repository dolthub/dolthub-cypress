import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Merged pull diff range page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPullId = "1";
const currentFromCommit = "d4vefgq8pq90v3qal0kp8rqddvh94nl6";
const currentToCommit = "8omjtv2r828d9sr2e84m12so9qr1evgn";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls/${currentPullId}/compare/${currentFromCommit}...${currentToCommit}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const skipped = false;
  const skipAll = true;

  const tests = [
    newExpectation(
      "should show diff summary",
      "[data-cy=commit-diff-summary]",
      beVisible,
      skipped,
    ),
    newExpectation(
      "should show table list",
      "[data-cy=diff-table-list]",
      beVisible,
      skipped,
    ),
    newExpectation(
      "should show table list items",
      "[data-cy=diff-table-list] > li",
      newShouldArgs("be.visible.and.have.length", 1),
      skipped,
    ),
    newExpectation(
      "should show diff selector",
      "[data-cy=diff-selector]",
      newShouldArgs("be.visible.and.contain", "Showing changes from 1 commit"),
      skipped,
    ),
    newExpectation(
      "should not find 404 page",
      "[data-cy=pull-404-page]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices, skip: skipAll });
});
