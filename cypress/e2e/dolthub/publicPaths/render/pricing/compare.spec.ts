import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectationWithURL } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { beVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Compare page";
const currentPage = "/compare";

// /compare was retired with the pricing redesign and now redirects to
// /pricing. The route is kept under test so the redirect cannot quietly
// disappear and start 404ing the links that still point at it.
describe(`${pageName} redirects to the pricing page on different devices`, () => {
  const tests = [
    newExpectationWithURL(
      "should be redirected to the pricing page",
      "[data-cy=pricing-page]",
      beVisible,
      "/pricing",
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
