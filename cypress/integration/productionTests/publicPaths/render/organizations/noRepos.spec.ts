import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Organization page with no repos";
const orgName = "test-org";
const currentPage = `/organizations/${orgName}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notBeVisible = newShouldArgs("not.be.visible");

  const testProfileCard = [
    newExpectation(
      "should show profile card",
      "[data-cy=profile-card]",
      beVisible,
    ),
    newExpectation(
      "should show profile card profile pic",
      "[data-cy=profile-card-pic]",
      beVisible,
    ),
    newExpectation(
      "should show profile card profile name",
      "[data-cy=profile-card-name]",
      newShouldArgs("be.visible.and.contain", orgName),
    ),
    newExpectation(
      "should show profile summary",
      "[data-cy=profile-summary]",
      beVisible,
    ),
    newExpectation(
      "should not show next steps",
      "[data-cy=profile-card-next-steps]",
      notBeVisible,
    ),
  ];

  const testTabContainer = [
    newExpectation(
      "should show tabs container",
      "[data-cy=org-profile-tabs-container]",
      beVisible,
    ),
    newExpectation(
      "should show Repositories tab",
      "[data-cy=org-repositories-tab]",
      beVisible,
    ),
    newExpectation(
      "should not show People tab",
      "[data-cy=org-people-tab]",
      notBeVisible,
    ),
    newExpectation(
      "should not show Settings tab",
      "[data-cy=org-settings-tab]",
      notBeVisible,
    ),
    newExpectation(
      "should not show Billing tab",
      "[data-cy=org-billing-tab]",
      notBeVisible,
    ),
    newExpectation(
      "should not show Payment History tab",
      "[data-cy=org-payment-history-tab]",
      notBeVisible,
    ),
    newExpectation(
      "should show no repos message",
      "[data-cy=no-repos-msg]",
      beVisible,
    ),
    newExpectation(
      "should not show list of owner repositories",
      "[data-cy=repository-list-for-owner]",
      notBeVisible,
    ),
    newExpectation(
      "should not show org member list",
      "[data-cy=org-member-list]",
      notBeVisible,
    ),
    newExpectation(
      "should not show org settings",
      "[data-cy=org-settings]",
      notBeVisible,
    ),
    newExpectation(
      "should not show org billing info",
      "[data-cy=billing-info]",
      notBeVisible,
    ),
    newExpectation(
      "should not show org payment history",
      "[data-cy=payment-history]",
      notBeVisible,
    ),
  ];

  const tests = [...testProfileCard, ...testTabContainer];

  const devices = desktopDevicesForAppLayout(pageName, tests);

  runTestsForDevices({ currentPage, devices });
});
