import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Commit log page for non-existent repo";
const currentOwner = "automated_testing";
const doesNotExistRepo = "doesnt-exist";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${doesNotExistRepo}/commits/${currentBranch}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should find Commit Log header",
      "[data-cy=repo-details-header]",
      newShouldArgs("be.visible.and.contain", "Commit Log"),
    ),
    newExpectation(
      "should find repo does not exist message",
      "[data-cy=repo-404-inner]",
      beVisible,
    ),
    newExpectation(
      "should not find commit list",
      "[data-cy=commit-log-commits-list]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
