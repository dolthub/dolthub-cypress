import { testRepoHeaderWithBranch } from "@sharedTests/repoHeaderNav";
import { testSqlConsole } from "@sharedTests/sqlEditor";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Workspace 404 page logged out";
const currentOwner = "automated_testing";
const currentRepo = "repo_tables_and_docs";
const workspace = "348d4226-fa12-4c6f-a624-7a597e1af129";
const currentPage = `repositories/${currentOwner}/${currentRepo}/workspaces/${workspace}`;
const loggedIn = false;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldBeVisible("repository-layout-container"),
    ...testRepoHeaderWithBranch(currentRepo, currentOwner, false, true),
    shouldNotExist("workspaces-run-msg"),
    shouldNotExist("workspace-title"),
    shouldNotExist("create-pull"),
    shouldNotExist("discard-work"),
    shouldNotExist("diff-tabs"),
    shouldFindAndContain("404-page", "Workspace not found"),
    shouldBeVisible("create-workspace-404"),
    testSqlConsole,
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
