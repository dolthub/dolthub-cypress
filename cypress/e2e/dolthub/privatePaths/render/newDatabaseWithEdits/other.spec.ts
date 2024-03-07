import { createTempDatabase } from "@sharedTests/createTempDatabase";
import { deleteTempDatabase } from "@sharedTests/deleteTempDatabase";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { testDocs } from "@utils/sharedTests/docs";
import { testPullRequest } from "@utils/sharedTests/pullRequest";
import { testSaveQuery } from "@utils/sharedTests/saveQuery";
import { testViewQuery } from "@utils/sharedTests/viewQuery";

const pageName = "Create, pull request/docs/saved query, teardown database";
const currentPage = "/profile/new-repository";
const loggedIn = true;

const randomNum = Math.ceil(Math.random() * 10000);
const repoName = `temp_db_${randomNum}`;
const ownerName = "cypresstesting";
const forkOwnerName = "a_dolthub_testing_org";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    ...createTempDatabase(repoName, ownerName),
    ...testDocs,
    ...testSaveQuery,
    ...testViewQuery,
    ...testPullRequest(forkOwnerName),
    ...deleteTempDatabase(repoName, forkOwnerName),
    ...deleteTempDatabase(repoName, ownerName),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
