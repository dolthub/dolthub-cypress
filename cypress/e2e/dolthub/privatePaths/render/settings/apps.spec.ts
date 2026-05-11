import { beVisible } from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Apps Settings";
const currentPage = "/settings/apps";

const loggedIn = true;

const skip = false;

const newAppFormClickFlow = newClickFlow(
  "[data-cy=new-oauth-app-button]",
  [
    newExpectation(
      "should render the create OAuth app form",
      "[data-cy=create-oauth-app-form]",
      beVisible,
    ),
    newExpectation(
      "should render breadcrumb back to OAuth Applications",
      "[data-cy=oauth-applications-back-link]",
      beVisible,
    ),
    newExpectation(
      "should render the Application name input",
      "[data-cy=create-oauth-app-form]",
      beVisible,
    ),
    newExpectation(
      "should render a disabled Register application button",
      "[data-cy=register-oauth-application-button]",
      newShouldArgs("be.disabled"),
    ),
    newExpectation(
      "should render a Cancel link",
      "[data-cy=cancel-create-oauth-app]",
      beVisible,
    ),
  ],
  "[data-cy=cancel-create-oauth-app]",
);

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      beVisible,
    ),
    newExpectation(
      "should render Settings Apps link",
      "[data-cy=settings-apps-section-link]",
      beVisible,
    ),
    newExpectation(
      "should render the OAuth Applications heading",
      "[data-cy=oauth-applications-heading]",
      beVisible,
    ),
    newExpectation(
      "should render the Authorized Applications heading",
      "[data-cy=authorized-applications-heading]",
      beVisible,
    ),
    newExpectationWithClickFlow(
      "clicking New OAuth App should open the form, then Cancel returns to the Apps page",
      "[data-cy=new-oauth-app-button]",
      beVisible,
      newAppFormClickFlow,
    ),
  ];
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
