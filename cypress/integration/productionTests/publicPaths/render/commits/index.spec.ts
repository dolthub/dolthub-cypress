import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Commit log page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/commits/${currentBranch}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notBeVisible = newShouldArgs("not.be.visible");

  const tests = [
    newExpectation(
      "should find Commit Log header",
      "[data-cy=repo-details-header]",
      newShouldArgs("be.visible.and.contain", "Commit Log"),
    ),
    newExpectation(
      "should find back to repo link",
      "[data-cy=back-to-repo-link]",
      newShouldArgs("be.visible.and.contain", `back to ${currentRepo}`),
    ),
    newExpectation(
      "should not find create pull button",
      "[data-cy=new-pull-button]",
      notBeVisible,
    ),
    newExpectation(
      "should not find empty commits message",
      "[data-cy=commit-log-no-commits]",
      notBeVisible,
    ),
    newExpectation(
      "should find commits list with at least 20 commits",
      "[data-cy=commit-log-commits-list] > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 20),
    ),
    newExpectation(
      "should find first commit commit and user links",
      "[data-cy=commit-log-item]:first a",
      newShouldArgs("be.visible.and.have.length", 3),
    ),
    newExpectation(
      "should find first commit prof pic",
      "[data-cy=commit-log-item-prof-pic]:first",
      beVisible,
    ),
    newExpectation(
      "should find first commit date",
      "[data-cy=commit-log-item-date]:first",
      beVisible,
    ),
    newExpectation(
      "should find first commit commit ID",
      "[data-cy=commit-log-item-commit-id]:first",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
