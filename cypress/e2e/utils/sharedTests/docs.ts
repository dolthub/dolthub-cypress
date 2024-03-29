import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";
import { mergingAndDeletingBranch } from "./editRepo";

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
    { value },
  );

export const testDocs: Tests = [
  // CREATE A NEW LICENSE
  newExpectationWithClickFlow(
    "should navigate to the new docs page",
    "[data-cy=repo-dropdown-button]",
    beVisible,
    newClickFlow(
      "[data-cy=repo-dropdown-button]",
      [],
      "[data-cy=dropdown-new-docs-link]",
    ),
  ),
  typingExpectation(licenseMarkdown, ""),
  newExpectationWithClickFlow(
    "should create the new doc",
    "[data-cy=new-doc-create-button]",
    beVisible,
    newClickFlow("[data-cy=new-doc-create-button]", []),
  ),
  // ...mergingAndDeletingBranch("Add License"),
  newExpectationWithClickFlow(
    "should render new license  in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
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
  ),
  // EDIT LICENSE
  typingExpectation(updatedLicenseMarkdown, "new"),
  newExpectationWithScrollIntoView(
    "should show save button",
    "[data-cy=submit-edit-docs-button]",
    newShouldArgs("be.visible.and.not.be.disabled"),
    true,
  ),
  newExpectationWithClickFlow(
    "should submit the edited doc",
    "[data-cy=submit-edit-docs-button]",
    beVisible,
    newClickFlow("[data-cy=submit-edit-docs-button]", []),
  ),
  ...mergingAndDeletingBranch("Update License"),
  newExpectationWithClickFlow(
    "should render the edited license in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    newClickFlow("[data-cy=repo-about-tab]", [
      newExpectation(
        "should contain 'test number 2'",
        "[data-cy=repo-doc-markdown]",
        beVisibleAndContain(updatedLicenseMarkdown),
      ),
    ]),
  ),
  //! CREATE README
  newExpectationWithClickFlow(
    "should navigate to the new docs page",
    "[data-cy=repo-dropdown-button]",
    beVisible,
    newClickFlow(
      "[data-cy=repo-dropdown-button]",
      [],
      "[data-cy=dropdown-new-docs-link]",
    ),
  ),
  typingExpectation(readmeMarkdown, ""),
  newExpectationWithClickFlow(
    "should create the new doc",
    "[data-cy=new-doc-create-button]",
    beVisible,
    newClickFlow("[data-cy=new-doc-create-button]", []),
  ),
  ...mergingAndDeletingBranch("Add Readme"),
  newExpectationWithClickFlow(
    "the new readme should render in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    newClickFlow("[data-cy=repo-about-tab]", [
      newExpectation(
        "should contain 'test'",
        "[data-cy=repo-doc-markdown]",
        beVisibleAndContain(readmeMarkdown),
      ),
    ]),
  ),
  // //! CHECK THAT BOTH DOCS ARE IN ABOUT
  newExpectation(
    "Docs list should contain both license and readme",
    "[data-cy=repo-docs-list] > li",
    newShouldArgs("be.visible.and.have.length", 2),
  ),
  // //! CHECK CANT MAKE NEW DOCS
  newExpectationWithClickFlow(
    "should navigate to the new docs page",
    "[data-cy=repo-dropdown-button]",
    beVisible,
    newClickFlow(
      "[data-cy=repo-dropdown-button]",
      [],
      "[data-cy=dropdown-new-docs-link]",
    ),
  ),
  newExpectationWithClickFlow(
    "should not be able to create a new doc",
    "[data-cy=new-doc-create-button]",
    newShouldArgs("be.disabled"),
    newClickFlow("[data-cy=repo-about-tab]", []),
  ),
  //! DELETE README
  newExpectationWithClickFlow(
    "should be able to delete the readme",
    "[data-cy=delete-docs-button]",
    beVisible,
    newClickFlow(
      "[data-cy=delete-docs-button]",
      [],
      "[data-cy=confirm-delete-docs-button]",
    ),
  ),
  ...mergingAndDeletingBranch("Delete Readme"),
  newExpectationWithClickFlow(
    "the deleted readme should not render in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    newClickFlow("[data-cy=repo-about-tab]", [
      newExpectation(
        "should not have the readme markdown'",
        "[data-cy=repo-doc-markdown]",
        newShouldArgs("be.visible.and.not.contain", "README.md"),
      ),
    ]),
  ),
  //! DELETE LICENSE
  newExpectationWithClickFlow(
    "should be able to delete the license",
    "[data-cy=delete-docs-button]",
    beVisible,
    newClickFlow(
      "[data-cy=delete-docs-button]",
      [],
      "[data-cy=confirm-delete-docs-button]",
    ),
  ),
  ...mergingAndDeletingBranch("Delete License"),
  newExpectationWithClickFlow(
    "the deleted license should not render in the about tab",
    "[data-cy=repo-about-tab]",
    beVisible,
    newClickFlow("[data-cy=repo-about-tab]", [
      newExpectation(
        "should not have the repo doc markdown'",
        "[data-cy=repo-doc-markdown]",
        notExist,
      ),
    ]),
  ),
];
