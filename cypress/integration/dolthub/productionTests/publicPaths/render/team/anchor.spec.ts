import { runTestsForDevices } from "../../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../../utils/devices";
import {
  newExpectation,
  newShouldArgs,
  scrollToPosition,
} from "../../../../../utils/helpers";
import {
  testMobileNavbar,
  testSignedOutNavbar,
} from "../../../../../utils/sharedTests/navbar";
import { Tests } from "../../../../../utils/types";

const pageName = "Team page with anchor";
const currentPage = "/team#taylor";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = (navbarTests: Tests) => [
    newExpectation(
      "should have Taylor team item visible",
      "[data-cy=team-item-taylor]",
      newShouldArgs("be.visible.and.contain", "Taylor Bantle"),
    ),
    scrollToPosition("#main-content", "top"),
    ...navbarTests,
    newExpectation(
      "should have about section",
      "[data-cy=about-us-section]",
      newShouldArgs("be.visible.and.contain", "About Us"),
    ),
    newExpectation(
      "should have team list",
      "[data-cy=team-section]",
      newShouldArgs("be.visible.and.contain", "Meet the Team"),
    ),
    newExpectation(
      "should have team list of at least 10",
      "[data-cy=team-section] ul > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 10),
    ),
  ];

  const skipNavbar = true;
  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    tests(testSignedOutNavbar),
    tests(testMobileNavbar),
    // Skip flaky iPhone tests for now
    [],
    skipNavbar,
  );
  runTestsForDevices({ currentPage, devices });
});
