import { iPhoneXForAppLayout, macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "DoltHub org people page";
const orgName = "DoltHub";
const currentPage = `/organizations/Liquidata/people`;

const commonDataCy = [
  "profile-card",
  "profile-card-pic",
  "profile-card-bio",
  "not-org-owner-people-msg",
];

const commonNotExist = [
  "repository-list-for-owner",
  "org-member-list",
  "org-settings",
  "billing-info",
  "payment-history",
];

const desktopDataCy = [
  "profile-summary",
  "profile-card-location",
  "org-profile-databases-tab",
];

const desktopNotExist = [
  "org-profile-people-tab",
  "org-profile-settings-tab",
  "org-profile-billing-tab",
  "org-profile-payment-history-tab",
  "add-location-link",
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
    shouldBeVisible("mobile-profile-selector"),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopTests, false),
    iPhoneXForAppLayout(pageName, mobileTests),
  ];
  runTestsForDevices({ currentPage, devices });
});
