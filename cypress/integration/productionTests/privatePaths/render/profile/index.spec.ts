import { runTestsForDevices } from "../../../../utils";
import { macbook15 } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "User profile";
const currentPage = "/profile";
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render repository list",
      "[data-cy=repository-list]",
      newShouldArgs("be.visible"),
    ),
  ];

  const devices = [macbook15(pageName, tests, loggedIn)];
  runTestsForDevices({ currentPage, devices });
});
