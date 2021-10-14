import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Pricing page";
const currentPage = "/pricing";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render pricing info",
      "[data-cy=pricing-info]",
      newShouldArgs("be.visible.and.contain", [
        "Pricing",
        "For Individuals",
        "For Enterprise",
      ]),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
