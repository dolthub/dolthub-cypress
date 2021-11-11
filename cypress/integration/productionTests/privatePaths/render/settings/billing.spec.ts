import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Billing Settings";
const currentPage = "/settings/billing";

const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Billing link",
      "[data-cy=settings-billing-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an input for address 1",
      "[data-cy=address-1-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an input for address 2",
      "[data-cy=address-2-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an input for city",
      "[data-cy=city-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an input for state",
      "[data-cy=state-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an input for card info",
      "[data-cy=card-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render a disabled submit billing info button",
      "[data-cy=billing-submit-button]",
      newShouldArgs("be.disabled"),
    ),
    newExpectation(
      "should have a cancel button",
      "[data-cy=cancel-button]",
      newShouldArgs("be.visible"),
    ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
