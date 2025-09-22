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
        "Dolt Is the Database",
        "Dolt Has a Built-In",
        "Agents for Everything that Isn't Code",
        "Dolt Is Git for Data",
        "Diff, Branch, and Merge",
        "You Already Know How to Use It",
        "The Dolt Ecosystem",
      ]),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
