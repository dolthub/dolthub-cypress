import { noCommitsTests } from "@sharedTests/diffs";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Diff page without selected commits";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare`;

describe(`${pageName} renders expected component on different devices`, () => {
  const devices = [macbook15ForAppLayout(pageName, noCommitsTests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
