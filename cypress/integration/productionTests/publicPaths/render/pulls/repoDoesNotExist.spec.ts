import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Pull requests page for non-existent repo";
const currentOwner = "automated_testing";
const doesNotExistRepo = "doesnt-exist";
const currentPage = `repositories/${currentOwner}/${doesNotExistRepo}/pulls`;

describe(`${pageName} expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should find Pull Requests header",
      "[data-cy=repo-details-header]",
      newShouldArgs("be.visible.and.contain", "Pull Requests"),
    ),
    newExpectation(
      "should find repo does not exist message",
      "[data-cy=repo-404-inner]",
      beVisible,
    ),
    newExpectation(
      "should not find pulls",
      "[data-cy=pull-requests-table]",
      newShouldArgs("not.be.visible"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
