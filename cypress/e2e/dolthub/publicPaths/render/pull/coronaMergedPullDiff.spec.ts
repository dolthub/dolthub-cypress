import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const isProd = Cypress.config().baseUrl === "https://www.dolthub.com";
const pageName = "Merged pull diff page";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPullId = isProd ? "5" : "1";
const currentPage = `repositories/${currentOwner}/${currentRepo}/pulls/${currentPullId}/compare`;

const skip = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should show pull diff breadcrumbs",
      "[data-cy=repo-pull-diff-breadcrumbs]",
      beVisible,
    ),
    newExpectation(
      "should show back to pull button",
      "[data-cy=back-to-pull]",
      beVisible,
    ),
    newExpectation(
      "should show diff selector",
      "[data-cy=diff-selector]",
      beVisible,
    ),
    newExpectation(
      "should show one form select",
      "[data-cy=form-select]",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectation(
      "should not have viewing message",
      "[data-cy=viewing-message]",
      newShouldArgs("not.exist"),
    ),
    newExpectation(
      "should show diff table name",
      "[data-cy=diff-table-name]",
      newShouldArgs("be.visible.and.contain", "case_details"),
    ),
    newExpectationWithClickFlow(
      "Option dropdown should have appropriate links",
      "[data-cy=options-button]",
      beVisible,
      newClickFlow("[data-cy=options-button]", [
        newExpectation(
          "should show View SQL link",
          "[data-cy=view-sql-link]",
          beVisible,
        ),
      ]),
    ),
    newExpectation(
      "should show filter by diff type selector",
      "[data-cy=filter-by-diff-type]",
      beVisible,
    ),
    newExpectation(
      "should show commit diff summary",
      "[data-cy=commit-diff-summary]",
      beVisible,
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
      "[data-cy=diff-table-stats-case_details]",
      beVisible,
    ),
    newExpectation(
      "should show diff table rows",
      "[data-cy=data-diff-case_details] > tbody > tr",
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectation(
      "should not find 404 page",
      "[data-cy=pull-404-page]",
      newShouldArgs("not.exist"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];

  runTestsForDevices({ currentPage, devices, skip });
});
