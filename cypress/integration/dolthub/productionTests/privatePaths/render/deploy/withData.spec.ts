import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import {
  newExpectation,
  newShouldArgs,
  newExpectationWithClickFlows,
  newClickFlow,
} from "../../../../../utils/helpers";

const pageName = "Issues page for non-existent database";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;
const loggedIn = true;

describe(`${pageName} expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should find hosted button",
      "[data-cy=hosted-button]",
      beVisible,
    ),
    newExpectation(
      "should find Create Deployment button",
      "[data-cy=hosted-create-deployment-button]",
      beVisible,
    ),
    newExpectationWithClickFlows(
      "should show self hosted button",
      "[data-cy=self-hosted-button]",
      beVisible,
      [newClickFlow("[data-cy=self-hosted-button]", [])],
    ),
    newExpectation(
      "should find download docker button",
      "[data-cy=self-hosted-download-dockerfile-button]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
