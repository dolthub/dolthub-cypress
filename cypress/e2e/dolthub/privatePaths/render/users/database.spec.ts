import { iPhoneXForAppLayout, macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "cypresstesting users page";
const username = "cypresstesting";
const currentPage = `/users/cypresstesting/repositories`;
const loggedIn = true;
const skip = false;

const commonDataCy = [
  "profile-card",
  "profile-card-pic",
  "profile-card-bio",
  "no-repos-msg",
];

const desktopDataCy = [
  "user-profile-databases-tab",
  "profile-summary",
  "add-website-link",
  "add-location-link",
  "create-database-button",
  "user-profile-organizations-tab",
];

describe(`${pageName} renders expected components on different devices`, () => {
  const commonTests = [
    ...commonDataCy.map(dc => shouldBeVisible(dc)),
    shouldFindAndContain("profile-card-name", username),
  ];

  const desktopTests = [
    ...commonTests,
    ...desktopDataCy.map(dc => shouldBeVisible(dc)),
  ];

  const mobileTests = [
    ...commonTests,
    shouldFindAndContain("mobile-profile-selector", "Database"),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopTests, false, loggedIn),
    iPhoneXForAppLayout(pageName, mobileTests, loggedIn),
  ];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
