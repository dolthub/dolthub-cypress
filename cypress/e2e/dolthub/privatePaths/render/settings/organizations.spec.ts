import { beVisible } from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Organizations Settings";
const currentPage = "/settings/organizations";

const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      beVisible,
    ),
    newExpectation(
      "should render Settings Organizations link",
      "[data-cy=settings-organizations-section-link]",
      beVisible,
    ),
    newExpectation(
      "should have an Org Memberships header",
      "[data-cy=org-memberships-header]",
      beVisible,
    ),
    newExpectation(
      "should render a table of the user's organizations",
      "[data-cy=organization-list]",
      beVisible,
    ),
    newExpectation(
      "should render create organization form",
      "[data-cy=new-org-form]",
      beVisible,
    ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
