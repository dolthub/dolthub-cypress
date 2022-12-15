import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectationWithURL, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Settings page for logged out user";
const currentPage = "/settings";

describe(`${pageName} redirects to the /signin page for logged out users on different devices`, () => {
  const tests = [
    newExpectationWithURL(
      "should be redirected to signin page and preserve redirect info",
      "[data-cy=signin-data-community]",
      newShouldArgs("be.visible.and.contain", "Be part of our data community"),
      "/signin?redirect=/settings",
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
