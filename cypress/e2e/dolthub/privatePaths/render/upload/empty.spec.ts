import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Upload file to empty repo";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
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
      "should not have branch selector",
      "[data-cy=upload-choose-branch]",
      newShouldArgs("not.exist"),
    ),
    newExpectation(
      "should have no branches message",
      "[data-cy=upload-no-branches]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
