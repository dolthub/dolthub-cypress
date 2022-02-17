import { runTestsForDevices } from "../../../../../utils";
import { allDevicesForSignedOut } from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";

const pageName = "Contact us page";
const currentPage = "/contact";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render contact us page with correct title",
      "[data-cy=contact-us-page]",
      newShouldArgs("be.visible.and.contain", [
        "Contact Us",
        "We usually respond within 24 hours",
      ]),
    ),
    newExpectation(
      "should have contact us form with 2 inputs",
      "[data-cy=contact-us-form] input",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should have contact us form with textarea",
      "[data-cy=contact-us-form] textarea",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectation(
      "should have disabled submit button",
      "[data-cy=contact-us-form] button",
      newShouldArgs("be.disabled"),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices });
});
