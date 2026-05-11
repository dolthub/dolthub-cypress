import { beVisible } from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "New OAuth App Page";
const currentPage = "/settings/apps/new";

const loggedIn = true;

const skip = false;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      beVisible,
    ),
    newExpectation(
      "should render the create OAuth app form",
      "[data-cy=create-oauth-app-form]",
      beVisible,
    ),
    newExpectation(
      "should render breadcrumb back link",
      "[data-cy=oauth-applications-back-link]",
      beVisible,
    ),
    newExpectation(
      "should render a disabled Register application button on initial load",
      "[data-cy=register-oauth-application-button]",
      newShouldArgs("be.disabled"),
    ),
    newExpectation(
      "should render a Cancel link",
      "[data-cy=cancel-create-oauth-app]",
      beVisible,
    ),
  ];
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
