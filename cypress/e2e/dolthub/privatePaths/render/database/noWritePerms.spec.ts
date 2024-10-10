import { testRepoHeaderForAll } from "@sharedTests/repoHeaderNav";
import {
  tableExpectations,
  testClickDeleteRow,
} from "@sharedTests/repoLeftNav";
import { beVisible } from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Logged in database page with no write perms";
const currentOwner = "dolthub";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;
const canWrite = false;
const hasDocs = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should find doc markdown",
      "[data-cy=repo-doc-markdown]",
      beVisible,
    ),
    ...testRepoHeaderForAll(
      currentRepo,
      currentOwner,
      canWrite,
      hasDocs,
      false,
      "about",
    ),
    ...tableExpectations(
      hasDocs,
      canWrite,
      11,
      "characteristics_case_severity",
    ),
    ...testClickDeleteRow(
      "create-fork-modal",
      newShouldArgs("be.visible.and.contain", "cypresstesting"),
    ),
  ];

  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
