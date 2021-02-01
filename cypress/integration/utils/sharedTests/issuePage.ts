import { newExpectation, newShouldArgs } from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");

// ISSUE HEADER

const testIssueHeader = (
  ownerName: string,
  repoName: string,
  issueId: string,
  issueState: string,
): Tests => [
  newExpectation(
    "should have repo header",
    "[data-cy=repo-issues-nav]",
    beVisible,
  ),
  newExpectation(
    "should have owner's name",
    "[data-cy=repo-issues-nav-owner-name]",
    newShouldArgs("be.visible.and.contain", ownerName),
  ),
  newExpectation(
    "should have repo's name",
    "[data-cy=repo-issues-nav-repo-name]",
    newShouldArgs("be.visible.and.contain", repoName),
  ),
  newExpectation(
    "should have repo's issues link",
    "[data-cy=repo-issues-nav-issues-list]",
    newShouldArgs("be.visible.and.contain", "issues"),
  ),
  newExpectation(
    "should have repo issue id",
    "[data-cy=repo-issues-nav-issue-id]",
    newShouldArgs("be.visible.and.contain", issueId),
  ),
  newExpectation(
    "should show state label",
    "[data-cy=issue-state-label]",
    newShouldArgs("be.visible.and.contain", issueState),
  ),
];

const testIssuePage = (): Tests => [
  newExpectation(
    "should show details section",
    "[data-cy=issue-page-details]",
    beVisible,
  ),
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
  ...testIssuePage(),
];
