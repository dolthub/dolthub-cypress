import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import {
  newExpectation,
  newShouldArgs,
  newExpectationWithClickFlows,
  newClickFlow,
} from "../../../../../utils/helpers";

const pageName = "Deploy page for empty database";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;
const loggedIn = true;

describe(`${pageName} expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should find hosted button",
      "[data-cy=hosted-button]",
      beVisible,
    ),
    newExpectation(
      "should not find Create Deployment button",
      "[data-cy=hosted-create-deployment-button]",
      notExist,
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
