import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "DoltHub org people page";
const orgName = "DoltHub";
const currentPage = `/organizations/Liquidata/people`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notBeVisible = newShouldArgs("not.be.visible");
  const notExist = newShouldArgs("not.exist");

  const commonTest = [
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
      "should show profile card profile bio",
      "[data-cy=profile-card-bio]",
      beVisible,
    ),
    newExpectation(
      "should show profile summary",
      "[data-cy=profile-summary]",
      beVisible,
    ),
    newExpectation(
      "should not show next steps",
      "[data-cy=profile-card-next-steps]",
      notExist,
    ),
  ];

  const testProfileCardDesktop = [
    newExpectation(
      "should show profile card profile name",
      "[data-cy=profile-card-name-desktop]",
      newShouldArgs("be.visible.and.contain", orgName),
    ),
    newExpectation(
      "should show profile card profile url",
      "[data-cy=profile-card-url-desktop]",
      beVisible,
    ),
    newExpectation(
      "should show profile card profile location",
      "[data-cy=profile-card-location-desktop]",
      beVisible,
    ),
  ];

  const testProfileCardMobile = [
    newExpectation(
      "should show profile card profile name",
      "[data-cy=profile-card-name-mobile]",
      newShouldArgs("be.visible.and.contain", orgName),
    ),
    newExpectation(
      "should show profile card profile url",
      "[data-cy=profile-card-url-mobile]",
      beVisible,
    ),
    newExpectation(
      "should show profile card profile location",
      "[data-cy=profile-card-location-mobile]",
      beVisible,
    ),
  ];

  const testTabContainer = [
    newExpectation(
      "should show tabs container",
      "[data-cy=org-profile-tabs-container]",
      beVisible,
    ),
    newExpectation(
      "should show Databases tab",
      "[data-cy=org-profile-databases-tab]",
      beVisible,
    ),
    newExpectation(
      "should have disabled People tab",
      "[data-cy=org-profile-people-tab]",
      notBeVisible,
    ),
    newExpectation(
      "should have disabled Settings tab",
      "[data-cy=org-profile-settings-tab]",
      notBeVisible,
    ),
    newExpectation(
      "should have disabled Billing tab",
      "[data-cy=org-profile-billing-tab]",
      notBeVisible,
    ),
    newExpectation(
      "should have disabled Payment History tab",
      "[data-cy=org-profile-payment-history-tab]",
      notBeVisible,
    ),
    newExpectation(
      "should not show list of owner repositories",
      "[data-cy=repository-list-for-owner]",
      notExist,
    ),
    newExpectation(
      "should show no org member permissions message",
      "[data-cy=not-org-owner-people-msg]",
      beVisible,
    ),
    newExpectation(
      "should not show org member list",
      "[data-cy=org-member-list]",
      notExist,
    ),
    newExpectation(
      "should not show org settings",
      "[data-cy=org-settings]",
      notExist,
    ),
    newExpectation(
      "should not show org billing info",
      "[data-cy=billing-info]",
      notExist,
    ),
    newExpectation(
      "should not show org payment history",
      "[data-cy=payment-history]",
      notExist,
    ),
  ];

  const desktopTests = [
    ...commonTest,
    ...testProfileCardDesktop,
    ...testTabContainer,
  ];
  const mobileTests = [
    ...commonTest,
    ...testProfileCardMobile,
    ...testTabContainer,
  ];

  const devices = allDevicesForAppLayout(pageName, desktopTests, mobileTests);

  runTestsForDevices({ currentPage, devices });
});
