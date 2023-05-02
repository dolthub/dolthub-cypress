import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { iPhoneXForAppLayout, macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Organization page with no repos";
const orgName = "no-repos-org";
const currentPage = `/organizations/${orgName}`;

const commonDataCy = [
  "profile-card",
  "profile-card-pic",
  "profile-card-bio",
  "no-repos-msg",
];

const commonNotExist = [
  "org-member-list",
  "org-settings",
  "billing-info",
  "payment-history",
  "repository-list-for-owner",
];

const desktopDataCy = ["profile-summary", "org-profile-databases-tab"];

const desktopNotExist = [
  "org-profile-people-tab",
  "org-profile-settings-tab",
  "org-profile-billing-tab",
  "org-profile-payment-history-tab",
  "profile-card-url",
  "profile-card-location",
  "add-location-link",
  "add-website-link",
];

describe(`${pageName} renders expected components on different devices`, () => {
  const commonTests = [
    ...commonDataCy.map(dc => shouldBeVisible(dc)),
    shouldFindAndContain("profile-card-name", orgName),
    ...commonNotExist.map(dc => shouldNotExist(dc)),
  ];

  const desktopTests = [
    ...commonTests,
    ...desktopDataCy.map(dc => shouldBeVisible(dc)),
    ...desktopNotExist.map(dc => shouldNotExist(dc)),
  ];

  const mobileTests = [
    ...commonTests,
    shouldFindAndContain("mobile-profile-selector", "Databases"),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopTests, false),
    iPhoneXForAppLayout(pageName, mobileTests),
  ];

  runTestsForDevices({ currentPage, devices });
});
