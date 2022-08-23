import { runTestsForDevices } from "../../../../utils";
import {
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "automated_testing organizaton page";
const orgName = "automated_testing";
const currentPage = `/organizations/automated_testing`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");
  const notBeVisible = newShouldArgs("not.be.visible");
  const skip = false;

  const commonTest = [
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
      "should show profile card profile bio",
      "[data-cy=profile-card-bio]",
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
  ];
  const testProfileCardDesktop = [
    newExpectation(
      "should show profile card profile name",
      "[data-cy=profile-card-name-desktop]",
      newShouldArgs("be.visible.and.contain", orgName),
      skip,
    ),
    newExpectation(
      "should show profile card profile url",
      "[data-cy=profile-card-url-desktop]",
      beVisible,
      skip,
    ),
  ];

  const testProfileCardMobile = [
    newExpectation(
      "should show profile card profile name",
      "[data-cy=profile-card-name-mobile]",
      newShouldArgs("be.visible.and.contain", orgName),
      skip,
    ),
    newExpectation(
      "should show profile card profile url",
      "[data-cy=profile-card-url-mobile]",
      beVisible,
      skip,
    ),
  ];

  const testDesktopTabContainer = [
    newExpectation(
      "should have create database button",
      "[data-cy=create-database-button]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have People tab",
      "[data-cy=org-profile-people-tab]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have  Settings tab",
      "[data-cy=org-profile-settings-tab]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should have  Billing tab",
      "[data-cy=org-profile-billing-tab]",
      beVisible,
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
      newShouldArgs("be.visible.and.have.length.of.at.least", 9),
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

  const desktopTests = [
    ...commonTest,
    ...testProfileCardDesktop,
    ...testDesktopTabContainer,
  ];
  const mobileTests = [...commonTest, ...testProfileCardMobile];
  const devices = [
    macbook15ForAppLayout(pageName, desktopTests, false, loggedIn),
    iPhoneXForAppLayout(pageName, mobileTests, loggedIn),
  ];

  runTestsForDevices({ currentPage, devices });
});
