import {
  newClickFlow,
  newExpectation,
  newShouldArgs,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newExpectationWithTypeString,
} from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const notExist = newShouldArgs("not.exist");
const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);

const typingExpectation = (status: string, value: string) =>
  newExpectationWithTypeString(
    `should write ${status}description in textbox`,
    "[data-cy=textarea-container]",
    beVisible,
    value,
  );

const mergingAndDeletingBranch = (status: string, value: string) => [
  newExpectation(
    `Should have title ${status} License`,
    "[data-cy=pull-page-title]",
    beVisibleAndContain(`${status} License`),
  ),
  newExpectation(
    "Should have Open pull state",
    "[data-cy=pull-state-label]",
    beVisibleAndContain("Open"),
  ),
  newExpectationWithClickFlows(
    `should merge ${value}doc`,
    "[data-cy=merge-button]",
    beVisible,
    [
      newClickFlow("[data-cy=merge-button]", [
        newExpectation(
          "Should say 'merging'",
          "[data-cy=merge-button]",
          beVisibleAndContain("Merging..."),
        ),
      ]),
    ],
  ),
  newExpectation(
    "Should have Merged pull state",
    "[data-cy=pull-state-label]",
    beVisibleAndContain("Merged"),
  ),
  newExpectationWithClickFlows(
    "should delete branch",
    "[data-cy=delete-branch-button]",
    beVisible,
    [newClickFlow("[data-cy=delete-branch-button]", [])],
  ),
];

export const testDocs: Tests = [
  newExpectationWithClickFlows(
    "should navigate to the new docs page",
    "[data-cy=dropdown-database-nav]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=dropdown-database-nav]",
        [],
        "[data-cy=dropdown-new-readme-link]",
      ),
    ],
  ),
  typingExpectation("", "test"),
  newExpectationWithClickFlows(
    "should create the new doc",
    "[data-cy=new-doc-create-button]",
    beVisible,
    [newClickFlow("[data-cy=new-doc-create-button]", [])],
  ),
  ...mergingAndDeletingBranch("Add", ""),
  newExpectationWithClickFlows(
    "the new license should render in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-about-tab]",
        [
          newExpectation(
            "should contain 'test'",
            "[data-cy=repo-doc-markdown]",
            beVisibleAndContain("test"),
          ),
        ],
        "[data-cy=edit-docs-button]",
      ),
    ],
  ),
  typingExpectation("new ", "test number 2"),
  newExpectationWithScrollIntoView(
    "Save button should now be visible",
    "[data-cy=submit-edit-docs-button]",
    newShouldArgs("be.visible.and.not.be.disabled"),
    true,
  ),
  newExpectationWithClickFlows(
    "should submit the edited doc",
    "[data-cy=submit-edit-docs-button]",
    beVisible,
    [newClickFlow("[data-cy=submit-edit-docs-button]", [])],
  ),
  ...mergingAndDeletingBranch("Update", "edited "),
  newExpectationWithClickFlows(
    "the edited license should render in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-about-tab]",
        [
          newExpectation(
            "should contain 'test number 2'",
            "[data-cy=repo-doc-markdown]",
            beVisibleAndContain("test number 2"),
          ),
        ],
        "[data-cy=delete-docs-button]",
      ),
    ],
  ),
  newExpectationWithClickFlows(
    "should be able to delete the docs",
    "[data-cy=confirm-delete-docs-button]",
    beVisible,
    [newClickFlow("[data-cy=confirm-delete-docs-button]", [])],
  ),
  ...mergingAndDeletingBranch("Delete", "deleted "),
  newExpectationWithClickFlows(
    "the deleted license should not render in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    [
      newClickFlow("[data-cy=repo-about-tab]", [
        newExpectation(
          "should not have the repo doc markdown'",
          "[data-cy=repo-doc-markdown]",
          notExist,
        ),
      ]),
    ],
  ),
  newExpectation(
    "Avatar should be visible",
    "[data-cy=navbar-menu-avatar]",
    beVisible,
  ),
];