import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Settings";
const currentPage = "/settings";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Profile link",
      "[data-cy=settings-profile-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Email link",
      "[data-cy=settings-email-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Credentials link",
      "[data-cy=settings-credentials-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Repositories link",
      "[data-cy=settings-repositories-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Organizations link",
      "[data-cy=settings-organizations-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Billing link",
      "[data-cy=settings-billing-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should not render Payment History link for standard Cypress Testing account with no payment plan/history",
      "[data-cy=settings-payment-history-section-link]",
      newShouldArgs("not.exist"),
      false,
    ),
    // The Development tab is expected to render ONLY in a local environment.
    // Because this test (and all on this page) require a signin, this test fails on localhost before it even reaches the assertion.
    newExpectation(
      "should not render Development link in dev or prod",
      "[data-cy=settings-development-section-link]",
      newShouldArgs("not.exist"),
      false,
    ),
  ];

  const devices = desktopDevicesForAppLayout(pageName, tests, true, loggedIn);
  runTestsForDevices({ currentPage, devices });
});
