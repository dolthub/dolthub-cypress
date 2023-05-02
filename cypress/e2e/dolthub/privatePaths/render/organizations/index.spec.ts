import { iPhoneXForAppLayout, macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "automated_testing organization page";
const orgName = "automated_testing";
const currentPage = `/organizations/automated_testing`;
const loggedIn = true;

const commonDataCy = ["profile-card", "profile-card-pic", "profile-card-bio"];

const desktopDataCy = [
  "org-profile-databases-tab",
  "profile-summary",
  "profile-card-url",
  "add-location-link",
  "create-database-button",
  "org-profile-people-tab",
  "org-profile-settings-tab",
  "org-profile-billing-tab",
];

const desktopNotExist = [
  "org-profile-payment-history-tab",
  "org-member-list",
  "org-settings",
  "billing-info",
  "payment-history",
];

describe(`${pageName} renders expected components on different devices`, () => {
  const skip = false;

  const commonTests = [
    ...commonDataCy.map(dc => shouldBeVisible(dc)),
    shouldFindAndContain("profile-card-name", orgName),
    newExpectation(
      "should show list of owner repositories",
      "[data-cy=repository-list-for-owner] li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 9),
    ),
  ];

  const desktopTests = [
    ...commonTests,
    ...desktopDataCy.map(dc => shouldBeVisible(dc)),
    ...desktopNotExist.map(dc => shouldNotExist(dc)),
  ];

  const mobileTests = [
    ...commonTests,
    shouldFindAndContain("mobile-profile-selector", "Database"),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopTests, false, loggedIn),
    iPhoneXForAppLayout(pageName, mobileTests, loggedIn),
  ];

  runTestsForDevices({ currentPage, devices, skip });
});
