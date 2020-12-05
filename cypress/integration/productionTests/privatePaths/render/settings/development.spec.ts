import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Settings page for logged out user";
const currentPage = "/settings/development";
const isLocalDoltHub = !!Cypress.env("LOCAL_DOLTHUB");
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const testsForLocalDoltHub = [
    newExpectation(
      "should render Development Page on localhost",
      "[data-cy=settings-development]",
      newShouldArgs(
        "be.visible.and.contain",
        "Would you like to delete all your repositories?",
      ),
    ),
    newExpectation(
      "should not render 404 for Development Page on localhost",
      "[data-cy=404-page]",
      newShouldArgs("not.exist"),
    ),
  ];

  const testsForDevProd = [
    newExpectation(
      "should render 404 on dev and prod for Development Page",
      "[data-cy=404-page]",
      newShouldArgs("be.visible.and.contain", "Page not found"),
    ),
    newExpectation(
      "should not render Development Page on dev and prod",
      "[data-cy=settings-development]",
      newShouldArgs("not.exist"),
    ),
  ];

  const tests = isLocalDoltHub ? testsForLocalDoltHub : testsForDevProd;

  const devices = [macbook15ForAppLayout(pageName, tests, true, loggedIn)];

  runTestsForDevices({ currentPage, devices });
});
