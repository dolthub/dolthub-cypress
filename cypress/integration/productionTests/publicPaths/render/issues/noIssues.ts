import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Issue page with no issues";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo_with_branch";
const currentPage = `repositories/${currentOwner}/${currentRepo}/issues`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should find Issues header",
      "[data-cy=repo-details-header]",
      newShouldArgs("be.visible.and.contain", "Issue"),
    ),
    newExpectation(
      "should find empty issue message",
      "[data-cy=issue-no-issues]",
      beVisible,
    ),
    newExpectation(
      "should not find issues",
      "[data-cy=issue-table]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
