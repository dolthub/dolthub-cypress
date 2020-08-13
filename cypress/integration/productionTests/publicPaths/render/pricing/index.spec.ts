import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";
import { testMailingForm } from "../../../../utils/sharedTests/mailingList";

const pageName = "Pricing page";
const currentPage = "/pricing";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const testPricing = [
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

  const tests = [...testPricing, ...testMailingForm(beVisible)];
  const iPhoneTests = [
    ...testPricing,
    ...testMailingForm(newShouldArgs("exist")),
  ];

  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    tests,
    tests,
    iPhoneTests,
  );

  runTestsForDevices({ currentPage, devices });
});
