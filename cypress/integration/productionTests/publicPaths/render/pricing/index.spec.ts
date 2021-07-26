import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Pricing page";
const currentPage = "/pricing";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should render pricing page with title",
      "[data-cy=pricing-page]",
      beVisible,
    ),
    newExpectation(
      "should render pricing info",
      "[data-cy=pricing-info]",
      newShouldArgs("be.visible.and.contain", [
        "Pricing",
        "DoltHub Basic",
        "DoltHub Pro",
      ]),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  // TODO: unskip for new pricing page
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
