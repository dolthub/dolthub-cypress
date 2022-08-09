import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import { beVisibleAndContain } from "../../../../utils/sharedTests/sharedFunctionsAndVariables";
import {
  testDeployHosted,
  testDeploySelfHosted,
} from "../../../../utils/sharedTests/testDeployTab";

const pageName = "Deploy page for database for user without permissions";
const currentOwner = "dolthub";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;
const loggedIn = true;

describe(`${pageName} expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const tests = [
    newExpectation(
      "should be able to fork to deploy",
      "[data-cy=fork-confirm-button]",
      beVisible,
    ),
    newExpectationWithClickFlows(
      "should be able to close fork modal",
      "[data-cy=close-modal]",
      beVisible,
      [newClickFlow("[data-cy=close-modal]", [])],
    ),
    ...testDeployHosted,
    newExpectation(
      "should find error message",
      "[data-cy=error-msg]",
      beVisibleAndContain(
        "Must be an owner of the organization 'dolthub' to create a deployment for this repo. Fork this repo to be able to create a deployment.",
      ),
    ),
    newExpectation(
      "should not find Create Deployment button",
      "[data-cy=hosted-create-deployment-button]",
      notExist,
    ),
    ...testDeploySelfHosted,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
