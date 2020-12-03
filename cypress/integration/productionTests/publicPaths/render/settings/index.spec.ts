import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newExpectationWithURL,
  newShouldArgs,
} from "../../../../utils/helpers";

const pageName = "Settings page for logged out user";
const currentPage = "/settings";

describe(`${pageName} redirects to the /signin page for logged out users on different devices`, () => {
  const tests = [
    newExpectationWithURL(
      "should be redirected to signin page and preserve redirect info",
      "[data-cy=signup-why-join]",
      newShouldArgs("be.visible.and.contain", "Why join DoltHub?"),
      false,
      "/signin?redirect=%2Fsettings",
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
