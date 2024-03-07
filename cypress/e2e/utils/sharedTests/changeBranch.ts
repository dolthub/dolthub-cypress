import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithURL,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);

type TestParams = {
  isLeftNavClosed: boolean;
  currentTabDataCy: string;
  destinationURL: string;
  optionalText?: string;
  destinationBranch: string;
  destinationBranchOptionalText?: string;
};

const checkCurrentBranch = (testParams: TestParams): Tests =>
  testParams.destinationBranchOptionalText
    ? [
        newExpectationWithURL(
          `should load page for tab ${testParams.currentTabDataCy}`,
          `[data-cy=${testParams.currentTabDataCy}]`,
          beVisible,
          `${testParams.destinationURL}`,
        ),
        newExpectation(
          "should see new branch ",
          `[data-cy=${testParams.currentTabDataCy}]`,
          beVisibleAndContain(testParams.destinationBranchOptionalText),
        ),
      ]
    : [
        newExpectationWithURL(
          "should have page load in ",
          `[data-cy=${testParams.currentTabDataCy}]`,
          beVisible,
          `${testParams.destinationURL}`,
        ),
      ];

export const changeBranch = (testParams: TestParams): Tests => [
  newExpectation(
    `should check current branch ${testParams.currentTabDataCy}`,
    `[data-cy=${testParams.currentTabDataCy}]`,
    testParams.optionalText
      ? beVisibleAndContain(testParams.optionalText)
      : beVisible,
  ),
  testParams.isLeftNavClosed
    ? newExpectationWithClickFlow(
        "should open menu",
        `[data-cy=left-nav-toggle-icon]`,
        beVisible,
        newClickFlow(`[data-cy=left-nav-toggle-icon]`, [
          newExpectationWithClickFlow(
            "should open branch selector",
            `[data-cy=branch-selector]`,
            beVisible,
            newClickFlow(`[data-cy=branch-selector]`, [
              newExpectationWithClickFlow(
                "should click on other branch",
                `[data-cy=${testParams.destinationBranch}]`,
                beVisible,
                newClickFlow(
                  `[data-cy=${testParams.destinationBranch}]`,
                  checkCurrentBranch(testParams),
                ),
              ),
            ]),
          ),
        ]),
      )
    : newExpectationWithClickFlow(
        "should open branch selector",
        `[data-cy=branch-selector]`,
        beVisible,
        newClickFlow(`[data-cy=branch-selector]`, [
          newExpectationWithClickFlow(
            "should click on other branch",
            `[data-cy=${testParams.destinationBranch}]`,
            beVisible,
            newClickFlow(
              `[data-cy=${testParams.destinationBranch}]`,
              checkCurrentBranch(testParams),
            ),
          ),
        ]),
      ),
];
