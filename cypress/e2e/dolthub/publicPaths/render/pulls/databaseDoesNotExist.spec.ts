import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Pull requests page for non-existent database";
const currentOwner = "automated_testing";
const doesNotExistRepo = "doesnt-exist";
const currentPage = `repositories/${currentOwner}/${doesNotExistRepo}/pulls`;

describe(`${pageName} expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should find 404 page",
      "[data-cy=404-page]",
      newShouldArgs("be.visible.and.contain", "Database not found"),
    ),
    newExpectation(
      "should find repo does not exist message",
      "[data-cy=repo-404-inner]",
      beVisible,
    ),
    newExpectation(
      "should not find pulls",
      "[data-cy=pull-requests-table]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
