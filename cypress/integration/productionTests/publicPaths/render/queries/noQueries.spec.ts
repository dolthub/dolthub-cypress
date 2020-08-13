import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Query catalog page with no pulls";
const currentOwner = "automated_testing";
const currentRepo = "wikipedia-ngrams";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/queries/${currentBranch}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should find Query Catalog header",
      "[data-cy=repo-details-header]",
      newShouldArgs("be.visible.and.contain", "Query Catalog"),
    ),
    newExpectation(
      "should find empty queries message with link",
      "[data-cy=repo-no-queries] > a",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should not find queries",
      "[data-cy=query-catalog-table]",
      newShouldArgs("not.be.visible"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
