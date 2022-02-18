import { runTestsForDevices } from "../../../../../utils";
import { allDevicesForSignedOut } from "../../../../../utils/devices";
import {
  newExpectation,
  newShouldArgs,
  scrollToPosition,
} from "../../../../../utils/helpers";

const pageName = "Team page";
const currentPage = "/team";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
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
    scrollToPosition("#main-content", "center"),
    newExpectation(
      "should have team list of at least 10",
      "[data-cy=team-section] ul > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 10),
    ),
  ];

  const skip = true;
  const devices = allDevicesForSignedOut(pageName, tests, tests);
  // TODO: Fix flakey test!
  //* Error is: CypressError: `cy.visit()` failed trying to load:
  runTestsForDevices({ currentPage, devices, skip });
});
