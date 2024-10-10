import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Open pull page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPullId = "6";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls/${currentPullId}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should not find 404 page",
      "[data-cy=pull-404-page]",
      notExist,
    ),
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
      "should show open label",
      "[data-cy=pull-page-open-label]",
      beVisible,
    ),
    newExpectation(
      "should show details section",
      "[data-cy=pull-page-details]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
