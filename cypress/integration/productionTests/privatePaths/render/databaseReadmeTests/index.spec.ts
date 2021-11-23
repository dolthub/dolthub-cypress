import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newShouldArgs,
  newExpectationWithClickFlows,
newExpectationWithScrollIntoView,
  newExpectationWithTypeString,
} from "../../../../utils/helpers";

const pageName = "Creating, Editing, and Deleting a readme";
const currentOwner = "automated_testing";
const currentRepo = "readme_testing_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;
const loggedIn = true;

const beVisible = newShouldArgs("be.visible");
// const notExist = newShouldArgs("not.exist");
const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectationWithClickFlows(
      "should navigate to the new readme page",
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
    newExpectationWithTypeString(
      "should write description in textbox",
      "[data-cy=textarea-container]",
      beVisible,
      "test",
    ),
    newExpectationWithClickFlows(
      "should create the new doc",
      "[data-cy=new-doc-create-button]",
      beVisible,
      [newClickFlow("[data-cy=new-doc-create-button]", [])],
    ),
    newExpectationWithClickFlows(
      "should merge doc",
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
    //! Gotta figure out how to make branches delete
    // newExpectationWithClickFlows(
    //     "should delete branch",
    //     "[data=cy=delete-branch-button]",
    //     beVisible,
    //     [
    //       newClickFlow(
    //         "[data=cy=delete-branch-button]",
    //         []
    //       ),
    //     ],
    //   ),
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
    newExpectationWithTypeString(
      "should write a new description in textbox",
      "[data-cy=textarea-container]",
      beVisible,
      "test number 2",
    ),
    newExpectationWithScrollIntoView(
        "Save button should now be visible",
        "[data-cy=submit-edit-docs-button]",
        newShouldArgs("be.visible.and.not.be.disabled"),
        true
    ),
    newExpectationWithClickFlows(
      "should submit the edited doc",
      "[data-cy=submit-edit-docs-button]",
      beVisible,
      [newClickFlow("[data-cy=submit-edit-docs-button]", [])],
    ),
    newExpectationWithClickFlows(
      "should merge edited doc",
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
    //! Gotta figure out how to make branches delete
    // newExpectationWithClickFlows(
    //     "should delete branch",
    //     "[data=cy=delete-branch-button]",
    //     beVisible,
    //     [
    //       newClickFlow(
    //         "[data=cy=delete-branch-button]",
    //         []
    //       ),
    //     ],
    //   ),
    newExpectationWithClickFlows(
      "the edited license should render in the abut tab",
      "[data-cy=repo-about-tab]",
      beVisible,
      [
        newClickFlow(
          "[data-cy=repo-about-tab]",
          [
            newExpectation(
              "should contain 'test'",
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
    newExpectationWithClickFlows(
      "should merge deleted doc",
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
    //! Gotta figure out how to make branches delete
    // newExpectationWithClickFlows(
    //     "should delete branch",
    //     "[data=cy=delete-branch-button]",
    //     beVisible,
    //     [
    //       newClickFlow(
    //         "[data=cy=delete-branch-button]",
    //         []
    //       ),
    //     ],
    //   ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
