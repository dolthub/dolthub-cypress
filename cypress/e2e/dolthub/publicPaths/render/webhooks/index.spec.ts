import { runTestsForDevices } from "../../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import {
  shouldBeVisible,
  shouldNotExist,
} from "../../../../utils/sharedTests/sharedFunctionsAndVariables";
import { mobileTests } from "../../../../utils/sharedTests/testRepoPageMobile";

const pageName = "Webhooks page logged out";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/webhooks`;
const loggedIn = false;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const desktopAndIpadTests = (isIpad = false) => [
    shouldBeVisible("repository-layout-container"),
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      isIpad,
    ),
    shouldNotExist("active-webhooks-settings-tab"),
    shouldBeVisible("settings-no-write-perms"),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests(), false, loggedIn),
    iPad2ForAppLayout(pageName, desktopAndIpadTests(true)),
    iPhoneXForAppLayout(
      pageName,
      mobileTests(
        currentOwner,
        currentRepo,
        `repositories/${currentOwner}/${currentRepo}/settings`,
        hasDocs,
        true,
      ),
    ),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
