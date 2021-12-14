import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const licenseMarkdown = "test";
const updatedLicenseMarkdown = "test number 2";
const readmeMarkdown = "test number 3";

const beVisible = newShouldArgs("be.visible");
const notExist = newShouldArgs("not.exist");
const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);

const typingExpectation = (value: string, status?: string) =>
  newExpectationWithTypeString(
    `should write ${status}description in textbox`,
    "[data-cy=textarea-container]",
    beVisible,
    value,
  );

export const mergingAndDeletingBranch = (
  value: string,
  status?: string,
  doc?: string,
) => [
  newExpectation(
    `Should have title ${status} ${doc}`,
    "[data-cy=pull-page-title]",
    beVisibleAndContain(`${status} ${doc}`),
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
  //! CREATE A NEW LICENSE
  newExpectationWithClickFlows(
    "should navigate to the new docs page",
    "[data-cy=repo-dropdown-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-dropdown-button]",
        [],
        "[data-cy=dropdown-new-docs-link]",
      ),
    ],
  ),
  typingExpectation(licenseMarkdown, ""),
  newExpectationWithClickFlows(
    "should create the new doc",
    "[data-cy=new-doc-create-button]",
    beVisible,
    [newClickFlow("[data-cy=new-doc-create-button]", [])],
  ),
  ...mergingAndDeletingBranch("", "Add", "License"),
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
            beVisibleAndContain(licenseMarkdown),
          ),
        ],
        "[data-cy=edit-docs-button]",
      ),
    ],
  ),
  //! EDIT LICESNE
  typingExpectation(updatedLicenseMarkdown, "new"),
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
  ...mergingAndDeletingBranch("edited ", "Update", "License"),
  newExpectationWithClickFlows(
    "the edited license should render in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    [
      newClickFlow("[data-cy=repo-about-tab]", [
        newExpectation(
          "should contain 'test number 2'",
          "[data-cy=repo-doc-markdown]",
          beVisibleAndContain(updatedLicenseMarkdown),
        ),
      ]),
    ],
  ),
  //! CREATE README
  newExpectationWithClickFlows(
    "should navigate to the new docs page",
    "[data-cy=repo-dropdown-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-dropdown-button]",
        [],
        "[data-cy=dropdown-new-docs-link]",
      ),
    ],
  ),
  typingExpectation(readmeMarkdown, ""),
  newExpectationWithClickFlows(
    "should create the new doc",
    "[data-cy=new-doc-create-button]",
    beVisible,
    [newClickFlow("[data-cy=new-doc-create-button]", [])],
  ),
  ...mergingAndDeletingBranch("", "Add", "Readme"),
  newExpectationWithClickFlows(
    "the new readme should render in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    [
      newClickFlow("[data-cy=repo-about-tab]", [
        newExpectation(
          "should contain 'test'",
          "[data-cy=repo-doc-markdown]",
          beVisibleAndContain(readmeMarkdown),
        ),
      ]),
    ],
  ),
  // //! CHECK THAT BOTH DOCS ARE IN ABOUT
  newExpectation(
    "Docs list should contain both license and readme",
    "[data-cy=repo-docs-list] > li",
    newShouldArgs("be.visible.and.have.length", 2),
  ),
  // //! CHECK CANT MAKE NEW DOCS
  newExpectationWithClickFlows(
    "should navigate to the new docs page",
    "[data-cy=repo-dropdown-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=repo-dropdown-button]",
        [],
        "[data-cy=dropdown-new-docs-link]",
      ),
    ],
  ),
  newExpectationWithClickFlows(
    "should not be able to create a new doc",
    "[data-cy=new-doc-create-button]",
    newShouldArgs("be.disabled"),
    [newClickFlow("[data-cy=repo-about-tab]", [])],
  ),
  //! DELETE README
  newExpectationWithClickFlows(
    "should be able to delete the readme",
    "[data-cy=delete-docs-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=delete-docs-button]",
        [],
        "[data-cy=confirm-delete-docs-button]",
      ),
    ],
  ),
  ...mergingAndDeletingBranch("deleted ", "Delete", "Readme"),
  newExpectationWithClickFlows(
    "the deleted readme should not render in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    [
      newClickFlow("[data-cy=repo-about-tab]", [
        newExpectation(
          "should not have the readme markdown'",
          "[data-cy=repo-doc-markdown]",
          newShouldArgs("be.visible.and.not.contain", "README.md"),
        ),
      ]),
    ],
  ),
  //! DELETE LICENSE
  newExpectationWithClickFlows(
    "should be able to delete the license",
    "[data-cy=delete-docs-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=delete-docs-button]",
        [],
        "[data-cy=confirm-delete-docs-button]",
      ),
    ],
  ),
  ...mergingAndDeletingBranch("deleted ", "Delete", "License"),
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
];
