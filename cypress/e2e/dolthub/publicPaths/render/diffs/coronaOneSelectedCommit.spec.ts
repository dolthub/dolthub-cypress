import { diffsWithCommitTests } from "@sharedTests/diffs";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Diff page with one selected commit";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentFromCommit = "cudpp1kiat6gl52rs9clj4mto8g1ms99";
const branch = "master";
const tableName = "places";
const currentPage = `repositories/${currentOwner}/${currentRepo}/compare/${branch}/${currentFromCommit}?tableName=${tableName}`;

describe(`${pageName} renders expected component on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectationWithScrollIntoView(
      "should show diff table name",
      "[data-cy=diff-table-name]",
      newShouldArgs("be.visible.and.contain", tableName),
      true,
    ),
    newExpectation(
      "should show diff table list summaries",
      "[data-cy=diff-table-list-summaries] > li",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectation(
      "should show table diff summary",
      "[data-cy=diff-table-stats]",
      beVisible,
    ),
    newExpectation(
      "should show diff table",
      `[data-cy=data-diff-${tableName}]`,
      beVisible,
    ),
    newExpectation(
      "should show diff table rows",
      `[data-cy=data-diff-${tableName}] > tbody > tr`,
      newShouldArgs("be.visible.and.have.length.of.at.least", 4),
    ),
    ...diffsWithCommitTests(currentFromCommit, 1, {
      hidden: ["place_id", "province_state", "country_region"],
      shown: ["latitude", "longitude"],
      tableName: "places",
    }),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
