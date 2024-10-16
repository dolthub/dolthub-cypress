import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import {
  shouldBeVisible,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { mobileTests } from "@utils/sharedTests/repoPageMobile";

const pageName = "Webhooks page logged out";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/webhooks`;
const loggedIn = false;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("repository-layout-container"),
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      false,
      "settings",
    ),
    shouldNotExist("active-webhooks-settings-tab"),
    shouldBeVisible("settings-no-write-perms"),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, tests, false, loggedIn),
    iPad2ForAppLayout(pageName, tests),
    iPhoneXForAppLayout(
      pageName,
      mobileTests(
        currentOwner,
        currentRepo,
        `repositories/${currentOwner}/${currentRepo}/settings`,
        hasDocs,
        true,
        true,
        false,
        "settings",
      ),
    ),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
