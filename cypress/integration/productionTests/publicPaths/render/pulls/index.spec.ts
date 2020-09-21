import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Pull requests page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notBeVisible = newShouldArgs("not.be.visible");

  const tests = [
    newExpectation(
      "should find Pull Requests header",
      "[data-cy=repo-details-header]",
      newShouldArgs("be.visible.and.contain", "Pull Requests"),
    ),
    newExpectation(
      "should find back to repo link",
      "[data-cy=back-to-repo-link]",
      newShouldArgs("be.visible.and.contain", `back to ${currentRepo}`),
    ),
    newExpectation(
      "should find create pull button",
      "[data-cy=new-pull-button]",
      beVisible,
    ),
    newExpectation(
      "should not find empty pull message",
      "[data-cy=pull-requests-no-pulls]",
      notBeVisible,
    ),
    newExpectation(
      "should find pull requests table with header",
      "[data-cy=pull-requests-table] > thead > tr > th",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    newExpectation(
      "should find at least 5 pulls",
      "[data-cy=pull-requests-table] > tbody > tr",
      newShouldArgs("be.visible.and.have.length.of.at.least", 5),
    ),
    newExpectation(
      "should find pull with ID 1 with 5 columns",
      "[data-cy=pull-requests-row-1] > td",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    newExpectation(
      "should find pull with ID 1 with two links",
      "[data-cy=pull-requests-row-1] > td > a",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should find pull with ID 1 with pull state label",
      "[data-cy=pull-requests-row-1] [data-cy=pull-state-label]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices });
});
