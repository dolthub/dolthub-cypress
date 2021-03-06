import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Query catalog page with no branch";
const currentOwner = "automated_testing";
const currentRepo = "empty_repo";
const currentBranch = "master";
const currentPage = `repositories/${currentOwner}/${currentRepo}/queries/${currentBranch}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should find Query Catalog header",
      "[data-cy=repo-details-header]",
      newShouldArgs("be.visible.and.contain", "Query Catalog"),
    ),
    newExpectation(
      "should find back to repo link",
      "[data-cy=back-to-repo-link]",
      newShouldArgs("be.visible.and.contain", `back to ${currentRepo}`),
    ),
    newExpectation(
      "should find page not found message",
      "[data-cy=404-page]",
      beVisible,
    ),
    newExpectation(
      "should not find pulls",
      "[data-cy=pull-requests-table]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
