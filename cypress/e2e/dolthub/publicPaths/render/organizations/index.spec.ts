import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { iPhoneXForAppLayout, macbook15ForAppLayout } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "DoltHub organization page";
const orgName = "DoltHub";
const currentPage = `/organizations/Liquidata`;
const skip = false;

const commonDataCy = ["profile-card", "profile-card-pic", "profile-card-bio"];

const commonNotExist = [
  "org-member-list",
  "org-settings",
  "billing-info",
  "payment-history",
];

const desktopDataCy = [
  "profile-summary",
  "profile-card-url",
  "profile-card-location",
  "org-profile-databases-tab",
];

const desktopNotExist = [
  "org-profile-people-tab",
  "org-profile-settings-tab",
  "org-profile-billing-tab",
  "org-profile-payment-history-tab",
  "add-location-link",
  "add-website-link",
];

describe(`${pageName} renders expected components on different devices`, () => {
  const commonTests = [
    ...commonDataCy.map(dc => shouldBeVisible(dc)),
    shouldFindAndContain("profile-card-name", orgName),
    ...commonNotExist.map(dc => shouldNotExist(dc)),
    newExpectationWithScrollIntoView(
      "should show list of owner repositories",
      "[data-cy=repository-list-for-owner]",
      beVisible,
      true,
    ),
    newExpectation(
      "should show repository list items",
      "[data-cy=repository-list-for-owner] li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 8),
    ),
  ];

  const desktopTests = [
    ...desktopDataCy.map(dc => shouldBeVisible(dc)),
    ...desktopNotExist.map(dc => shouldNotExist(dc)),
    ...commonTests,
  ];

  const mobileTests = [
    shouldFindAndContain("mobile-profile-selector", "Databases"),
    ...commonTests,
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopTests, false),
    iPhoneXForAppLayout(pageName, mobileTests),
  ];

  runTestsForDevices({ currentPage, devices, skip });
});
