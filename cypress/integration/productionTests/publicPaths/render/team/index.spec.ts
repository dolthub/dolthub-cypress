import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

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
    newExpectation(
      "should have team list of at least 10",
      "[data-cy=team-section] ul > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 10),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices });
});
