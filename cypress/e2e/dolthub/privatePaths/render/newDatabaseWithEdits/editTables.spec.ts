import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { createTempDatabase } from "../../../../utils/sharedTests/createTempDatabase";
import { deleteTempDatabase } from "../../../../utils/sharedTests/deleteTempDatabase";
import { testAddTable } from "../../../../utils/sharedTests/testAddTable";
import { testUpdateTable } from "../../../../utils/sharedTests/testUpdateTable";

const pageName = "Create, edit tables, teardown database";
const currentPage = "/profile/new-repository";
const loggedIn = true;

const randomNum = Math.ceil(Math.random() * 10000);
const repoName = `temp_db_${randomNum}`;
const ownerName = "cypresstesting";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    ...createTempDatabase(repoName, ownerName),
    ...testAddTable,
    ...testUpdateTable,
    ...deleteTempDatabase(repoName, ownerName),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
