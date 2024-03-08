import { createTempDatabase } from "@sharedTests/createTempDatabase";
import { deleteTempDatabase } from "@sharedTests/deleteTempDatabase";
import { editTempDatabase } from "@sharedTests/editTempDatabase";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { testIssues } from "@utils/sharedTests/issues";

const pageName = "Create, edit, teardown database";
const currentPage = "/profile/new-repository";
const loggedIn = true;

const randomNum = Math.ceil(Math.random() * 10000);
const repoName = `temp_db_${randomNum}`;
const ownerName = "cypresstesting";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    ...createTempDatabase(repoName, ownerName),
    ...editTempDatabase,
    ...testIssues,
    ...deleteTempDatabase(repoName, ownerName),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
