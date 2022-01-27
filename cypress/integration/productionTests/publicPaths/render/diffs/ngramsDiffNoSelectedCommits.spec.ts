import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { noCommits } from "../../../../utils/sharedTests/diffs";

const pageName = "Diff page without selected commits";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare`;

describe(`${pageName} renders expected component on different devices`, () => {
  const devices = [macbook15ForAppLayout(pageName, noCommits)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
