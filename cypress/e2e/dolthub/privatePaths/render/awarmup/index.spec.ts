import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Signin page warmup";
const currentPage = "/signin";

// This should be the first test within privatePaths/render
describe(pageName, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = [
    newExpectation(
      "should have sign in form",
      "[data-cy=signin-email-form]",
      beVisible,
    ),
    newExpectation(
      "should have username input",
      "input[name=username]",
      beVisible,
    ),
    newExpectation(
      "should have password input",
      "input[name=password]",
      beVisible,
    ),
  ];
  const devices = desktopDevicesForSignedOut(pageName, tests);
  runTestsForDevices({ currentPage, devices });
});
