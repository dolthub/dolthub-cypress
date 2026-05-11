import {
  shouldBeVisible,
  shouldBeVisibleAndScrollIntoView,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "New OAuth App Page";
const currentPage = "/settings/apps/new";

const loggedIn = true;
const skip = false;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("settings-header", "Settings header"),
    shouldBeVisible("create-oauth-app-form", "create OAuth app form"),
    shouldBeVisible("oauth-applications-back-link", "breadcrumb back link"),
    newExpectation(
      "should render a disabled Register application button on initial load",
      "[data-cy=register-oauth-application-button]",
      newShouldArgs("be.disabled"),
    ),
    shouldBeVisibleAndScrollIntoView("cancel-create-oauth-app", "Cancel link"),
  ];
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
