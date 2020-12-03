import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Settings page for logged out user";
const currentPage = "/settings";

describe(`${pageName} redirects to the /signin page for logged out users on different devices`, () => {
  const tests = [
    newExpectation(
      "should be redirected to signin page",
      "[data-cy=signup-why-join]",
      newShouldArgs("be.visible.and.contain", "Why join DoltHub?"),
      false,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
