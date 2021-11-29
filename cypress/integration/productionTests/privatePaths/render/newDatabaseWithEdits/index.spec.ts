import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { createTempDatabase } from "../../../../utils/sharedTests/createTempDatabase";
import { deleteTempDatabase } from "../../../../utils/sharedTests/deleteTempDatabase";
import { editTempDatabase } from "../../../../utils/sharedTests/editTempDatabase";
import { testDocs } from "../../../../utils/sharedTests/testDocs";

const pageName = "Create, edit, teardown database";
const currentPage = "/profile/new-repository";
const loggedIn = true;

const randomNum = Math.ceil(Math.random() * 10000);
const repoName = `temp_db_${randomNum}`;
const ownerName = "cypresstesting";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    ...createTempDatabase(repoName, ownerName),
    ...testDocs,
    ...editTempDatabase,
    ...deleteTempDatabase(repoName, ownerName),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
