import {
  beVisible,
  shouldBeVisible,
  shouldBeVisibleAndScrollIntoView,
} from "@sharedTests/sharedFunctionsAndVariables";
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
    shouldBeVisible("create-oauth-app-form", "create OAuth app form"),
    shouldBeVisible(
      "oauth-applications-back-link",
      "breadcrumb back to OAuth Applications",
    ),
    newExpectation(
      "should render a disabled Register application button",
      "[data-cy=register-oauth-application-button]",
      newShouldArgs("be.disabled"),
    ),
    shouldBeVisibleAndScrollIntoView("cancel-create-oauth-app", "Cancel link"),
  ],
  "[data-cy=cancel-create-oauth-app]",
);

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("settings-header", "Settings header"),
    shouldBeVisible("settings-apps-section-link", "Settings Apps link"),
    shouldBeVisible("oauth-applications-heading", "OAuth Applications heading"),
    shouldBeVisible(
      "authorized-applications-heading",
      "Authorized Applications heading",
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
