import { runTestsForDevices } from "../../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testRepoHeaderWithBranch } from "../../../../utils/sharedTests/repoHeaderNav";
import {
  beVisible,
  notExist,
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
    newExpectation(
      "should have repository layout",
      "[data-cy=repository-layout-container]",
      beVisible,
    ),
    ...testRepoHeaderWithBranch(
      currentRepo,
      currentOwner,
      loggedIn,
      hasDocs,
      isIpad,
    ),
    newExpectation(
      "should not find active webhooks settings tab",
      "[data-cy=active-webhooks-settings-tab]",
      notExist,
    ),
    newExpectation(
      "should render no write perms message",
      "#main-content",
      newShouldArgs("be.visible.and.contain", [
        "Settings",
        "Must have write permissions to edit database.",
      ]),
    ),
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
