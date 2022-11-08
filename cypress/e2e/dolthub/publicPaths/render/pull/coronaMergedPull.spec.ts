import { changeBranch } from "@sharedTests/changeBranch";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Merged pull page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPullId = "4";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls/${currentPullId}`;
const destinationBranch = "archived";

// Need to investigate why the tests for this page are flaky
const skip = false;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");
  const skipNavbar = false;
  const changeParams = {
    isLeftNavClosed: true,
    currentTabDataCy: "pull-page-title",
    destinationBranch,
    destinationURL: `/${currentPage}?refName=${destinationBranch}`,
  };

  const tests = [
    ...changeBranch(changeParams),
    newExpectation("should show title", "[data-cy=pull-page-title]", beVisible),
    newExpectation(
      "should show view diffs button",
      "[data-cy=view-diffs-button]",
      beVisible,
    ),
    newExpectation(
      "should show description",
      "[data-cy=pull-page-description]",
      beVisible,
    ),
    newExpectation(
      "should not show edit description button for logged out user",
      "[data-cy=pull-page-edit-description-button]",
      notExist,
    ),
    newExpectation(
      "should show pull intent",
      "[data-cy=pull-page-intent]",
      beVisible,
    ),
    newExpectation(
      "should show merged label",
      "[data-cy=pull-page-merged-label]",
      beVisible,
    ),
    newExpectation(
      "should show details section",
      "[data-cy=pull-page-details]",
      beVisible,
    ),
    newExpectation(
      "should not find 404 page",
      "[data-cy=pull-404-page]",
      notExist,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, skipNavbar)];

  runTestsForDevices({ currentPage, devices, skip });
});
