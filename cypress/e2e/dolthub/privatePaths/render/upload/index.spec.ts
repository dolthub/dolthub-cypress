import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Upload file to repo with data";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const currentPage = `repositories/${currentOwner}/${currentRepo}/upload`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should have upload navigation",
      "[data-cy=upload-nav]",
      beVisible,
    ),
    newExpectation(
      "'Branch' nav item should be active",
      "[data-cy=upload-nav-item-branch-active]",
      beVisible,
    ),
    newExpectation(
      "should have branch selector",
      "[data-cy=upload-choose-branch]",
      beVisible,
    ),
    newExpectation(
      "should not have no branches message",
      "[data-cy=upload-no-branches]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
