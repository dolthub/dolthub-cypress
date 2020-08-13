import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Merged pull page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPullId = "1";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls/${currentPullId}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notBeVisible = newShouldArgs("not.be.visible");

  const tests = [
    newExpectation(
      "should not find 404 page",
      "[data-cy=pull-404-page]",
      notBeVisible,
    ),
    newExpectation("should show title", "[data-cy=pull-page-title]", beVisible),
    newExpectation(
      "should show description",
      "[data-cy=pull-page-description]",
      beVisible,
    ),
    newExpectation(
      "should not show edit description button for logged out user",
      "[data-cy=pull-page-edit-description-button]",
      notBeVisible,
    ),
    newExpectation(
      "should show pull intent",
      "[data-cy=pull-page-intent]",
      beVisible,
    ),
    newExpectation(
      "should show back to repo button",
      "[data-cy=diffs-back-to-repo-button]",
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
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
