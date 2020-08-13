import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Commit log page";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/commits/${currentBranch}`;

describe(`${pageName} with no branch renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

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
      "should find page not found message",
      "[data-cy=404-page]",
      beVisible,
    ),
    newExpectation(
      "should not find commit list",
      "[data-cy=commit-log-commits-list]",
      newShouldArgs("not.be.visible"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
