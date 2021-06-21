import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "DoltHub organizaton page";
const orgName = "DoltHub";
const currentPage = `/organizations/Liquidata`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");
  const notBeVisible = newShouldArgs("not.be.visible");
  const skip = false;

  const testProfileCard = [
    newExpectation(
      "should show profile card",
      "[data-cy=profile-card]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show profile card profile pic",
      "[data-cy=profile-card-pic]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show profile card profile name",
      "[data-cy=profile-card-name]",
      newShouldArgs("be.visible.and.contain", orgName),
      skip,
    ),
    newExpectation(
      "should show profile card profile bio",
      "[data-cy=profile-card-bio]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show profile card profile url",
      "[data-cy=profile-card-url]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show profile card profile location",
      "[data-cy=profile-card-location]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show profile summary",
      "[data-cy=profile-summary]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should not show next steps",
      "[data-cy=profile-card-next-steps]",
      notExist,
      skip,
    ),
  ];

  const testTabContainer = [
    newExpectation(
      "should show tabs container",
      "[data-cy=org-profile-tabs-container]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show Databases tab",
      "[data-cy=org-profile-databases-tab]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have disabled People tab",
      "[data-cy=org-profile-people-tab]",
      notBeVisible,
      skip,
    ),
    newExpectation(
      "should have disabled Settings tab",
      "[data-cy=org-profile-settings-tab]",
      notBeVisible,
      skip,
    ),
    newExpectation(
      "should have disabled Billing tab",
      "[data-cy=org-profile-billing-tab]",
      notBeVisible,
      skip,
    ),
    newExpectation(
      "should have disabled Payment History tab",
      "[data-cy=org-profile-payment-history-tab]",
      notBeVisible,
      skip,
    ),
    newExpectation(
      "should show list of owner repositories",
      "[data-cy=repository-list-for-owner] li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 20),
      skip,
    ),
    newExpectation(
      "should not show org member list",
      "[data-cy=org-member-list]",
      notExist,
      skip,
    ),
    newExpectation(
      "should not show org settings",
      "[data-cy=org-settings]",
      notExist,
      skip,
    ),
    newExpectation(
      "should not show org billing info",
      "[data-cy=billing-info]",
      notExist,
      skip,
    ),
    newExpectation(
      "should not show org payment history",
      "[data-cy=payment-history]",
      notExist,
      skip,
    ),
  ];

  const tests = [...testProfileCard, ...testTabContainer];

  const devices = desktopDevicesForAppLayout(pageName, tests, skip);

  runTestsForDevices({ currentPage, devices });
});
