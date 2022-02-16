import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";

const pageName = "Organizations Settings";
const currentPage = "/settings/organizations";

const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Organizations link",
      "[data-cy=settings-organizations-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have an Org Memberships header",
      "[data-cy=org-memberships-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render a button to Create Organizations",
      "[data-cy=create-org-button]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render a table of the user's organizations",
      "[data-cy=organization-list]",
      newShouldArgs("be.visible"),
    ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
