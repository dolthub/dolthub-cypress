import { runTestsForDevices } from "../../../utils";
import { macbook15ForDoltLabSignedOutLayout } from "../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../utils/helpers";
import { checkRepoListForTab } from "../../../utils/sharedTests/reposContainer";

const pageName = "home page";
const currentPage = "/";

describe(`DoltLab ${pageName} renders expected components`, () => {
  const beVisible = newShouldArgs("be.visible");
  const tests = [
    newExpectation(
      "should have database search input",
      "[data-cy=search-input]",
      beVisible,
    ),
    newExpectation(
      "should have create database button",
      "[data-cy=create-database-button]",
      beVisible,
    ),
    newExpectation(
      "should have database container",
      "[data-cy=repos-container-with-tabs]",
      newShouldArgs("be.visible.and.contain", "Discover"),
    ),
    ...checkRepoListForTab("most-recent", 3),
  ];

  const devices = [macbook15ForDoltLabSignedOutLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
