import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Homepage";
const currentPage = "/";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "renders expected headers",
      "#main-content",
      newShouldArgs("be.visible.and.contain", [
        "Git for data",
        "Diff, branch, and merge",
        "You already know how to use it",
        "Deploy as a replica or primary",
        "The Dolt Ecosystem",
        "invalid",
      ]),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
