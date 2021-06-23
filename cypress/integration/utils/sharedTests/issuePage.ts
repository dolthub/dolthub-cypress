import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { ClickFlow, Tests } from "../types";
import { testLoggedInSignInTo, testLoggedOutSignInTo } from "./signInTo";

const beVisible = newShouldArgs("be.visible");

// ISSUE HEADER

const testIssueHeader = (
  ownerName: string,
  repoName: string,
  issueId: string,
  issueState: string,
): Tests => [
  newExpectation(
    "should have issue breadcrumbs",
    "[data-cy=repo-issue-breadcrumbs]",
    beVisible,
  ),
  newExpectation(
    "should have owner's name",
    "[data-cy=repo-owner-breadcrumb-link]",
    newShouldArgs("be.visible.and.contain", ownerName),
  ),
  newExpectation(
    "should have repo's name",
    "[data-cy=repo-name-breadcrumb-link]",
    newShouldArgs("be.visible.and.contain", repoName),
  ),
  newExpectation(
    "should have repo's issues link",
    "[data-cy=repo-issues-breadcrumb-link]",
    newShouldArgs("be.visible.and.contain", "issues"),
  ),
  newExpectation(
    "should have repo issue id",
    "[data-cy=repo-issue-breadcrumb-text]",
    newShouldArgs("be.visible.and.contain", issueId),
  ),
  newExpectation(
    "should show state label",
    "[data-cy=issue-state-label]",
    newShouldArgs("be.visible.and.contain", issueState),
  ),
];

// ISSUE PAGE

const testIssuePage = [
  newExpectation("should show title", "[data-cy=issue-page-title]", beVisible),
  newExpectation(
    "should show description",
    "[data-cy=issue-page-description]",
    beVisible,
  ),
];

export const testIssuePageForAll = (
  ownerName: string,
  repoName: string,
  issueId: string,
  issueState: string,
) => [
  ...testIssueHeader(ownerName, repoName, issueId, issueState),
  ...testIssuePage,
];

// NEW ISSUE BUTTON / FORM

const testNewIssueForm = [
  newExpectation(
    "should render new issue form",
    "[data-cy=new-issue-form]",
    beVisible,
  ),
  newExpectation(
    "should render new issue form",
    "[data-cy=new-issue-form]",
    newShouldArgs("be.visible.and.contain", "Title"),
  ),
  newExpectation(
    "should render new issue form",
    "[data-cy=new-issue-form] input",
    beVisible,
  ),
  newExpectation(
    "should render new issue form",
    "[data-cy=new-issue-form]",
    newShouldArgs("be.visible.and.contain", "Description"),
  ),
  newExpectation(
    "should render new issue form",
    "[data-cy=new-issue-form] textarea",
    beVisible,
  ),
  newExpectation(
    "should render new issue form",
    "[data-cy=new-issue-form] textarea",
    beVisible,
  ),
  newExpectation(
    "should render issue form button group",
    "[data-cy=new-issue-form-button-group]",
    newShouldArgs("be.visible.and.contain", ["Create issue", "Cancel"]),
  ),
];

const newIssueButtonClickFlow = (loggedIn: boolean): ClickFlow =>
  newClickFlow(
    "[data-cy=new-issue-button]",
    loggedIn
      ? [...testLoggedInSignInTo, ...testNewIssueForm]
      : testLoggedOutSignInTo("create an issue"),
    "[data-cy=close-modal]",
  );

export const testNewIssueButton = (loggedIn: boolean): Tests => [
  newExpectationWithClickFlows(
    "should find Create Issue Button",
    "[data-cy=new-issue-button]",
    beVisible,
    [newIssueButtonClickFlow(loggedIn)],
  ),
];
