import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Agent Landing Page";
const currentPage = "/use-cases/agents";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "renders expected headers",
      "#main-content",
      newShouldArgs("be.visible.and.contain", [
        "Dolt is the Database",
        "Build for the Agent Era",
        "Never Trust an Agent",
        "Dolt has a Built-In",
        "Agents for Everything that isn't Code",
      ]),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
