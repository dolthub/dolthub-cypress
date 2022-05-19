import { testViewQuery } from "cypress/integration/utils/sharedTests/testViewQuery";
import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import { createTempDatabase } from "../../../../../utils/sharedTests/createTempDatabase";
import { deleteTempDatabase } from "../../../../../utils/sharedTests/deleteTempDatabase";
import { testDocs } from "../../../../../utils/sharedTests/testDocs";
import { testPullRequest } from "../../../../../utils/sharedTests/testPullRequest";
import { testSaveQuery } from "../../../../../utils/sharedTests/testSaveQuery";

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
  runTestsForDevices({ currentPage, devices, skip });
});
