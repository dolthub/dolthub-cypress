import { runTestsForDevices } from "../../../../utils";
import { macbook15 } from "../../../../utils/devices";
import {
  newExpectationWithRedirect,
  newShouldArgs,
} from "../../../../utils/helpers";

const pageName = "Sign in page";
const currentPageWithRedirect = "/signin?redirect=%2Fsettings";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  // Test that a signin URL with search params redirects to the expected page after signin.
  const redirectTests = [
    newExpectationWithRedirect(
      "should redirect to /settings page after sign in",
      "[data-cy=settings-header]",
      beVisible,
      "settings",
    ),
  ];
  const skip = true;
  const devicesForRedirectLink = [macbook15(pageName, redirectTests, false)];
  runTestsForDevices({
    currentPage: currentPageWithRedirect,
    devices: devicesForRedirectLink,
    skip,
  });
});
