import { changeBranch } from "@sharedTests/changeBranch";
import { doltConfig, doltgresConfig } from "@sharedTests/databaseTypes";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const configs = [
  { ...doltConfig, currentRepo: "corona-virus" },
  { ...doltgresConfig, currentRepo: "corona-virus-doltgres" },
];
const destinationBranch = "archived";

configs.forEach(c => {
  const pageName = `${c.label} page with tables and docs`;
  const currentPage = `repositories/${c.currentOwner}/${c.currentRepo}`;

  describe(`${pageName} renders expected components on different devices`, () => {
    const testParams = {
      isLeftNavClosed: false,
      currentTabDataCy: "description",
      destinationBranch,
      destinationURL: `/${currentPage}/doc/${destinationBranch}`,
    };

    const devices = [macbook15ForAppLayout(pageName, changeBranch(testParams))];
    const skip = false;
    runTestsForDevices({ currentPage, devices, skip });
  });
});
