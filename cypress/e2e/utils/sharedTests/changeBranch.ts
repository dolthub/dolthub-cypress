import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithURL,
  newShouldArgs,
} from "../helpers";

const beVisible = newShouldArgs("be.visible");
const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);

type TestParams = {
  isLeftNavClosed: boolean;
  currentTabID: string;
  destinationURL: string;
  optionalText?: string;
  destinationBranch: string;
  destinationBranchOptionalText?: string;
};

const checkCurrentBranch = (testParams: TestParams) =>
  testParams.destinationBranchOptionalText
    ? [
        newExpectationWithURL(
          "should have page load in ",
          `[data-cy=${testParams.currentTabID}]`,
          beVisible,
          `${testParams.destinationURL}`,
        ),
        newExpectation(
          "should see new branch ",
          `[data-cy=${testParams.currentTabID}]`,
          beVisibleAndContain(testParams.destinationBranchOptionalText),
        ),
      ]
    : [
        newExpectationWithURL(
          "should have page load in ",
          `[data-cy=${testParams.currentTabID}]`,
          beVisible,
          `${testParams.destinationURL}`,
        ),
      ];

export const changeBranch = (testParams: TestParams) => [
  newExpectation(
    `should check current branch ${testParams.currentTabID}`,
    `[data-cy=${testParams.currentTabID}]`,
    testParams.optionalText
      ? beVisibleAndContain(testParams.optionalText)
      : beVisible,
  ),
  testParams.isLeftNavClosed
    ? newExpectationWithClickFlows(
        "should open menu",
        `[data-cy=left-nav-toggle-icon]`,
        beVisible,
        [
          newClickFlow(`[data-cy=left-nav-toggle-icon]`, [
            newExpectationWithClickFlows(
              "should open branch selector",
              `[data-cy=branch-selector]`,
              beVisible,
              [
                newClickFlow(`[data-cy=branch-selector]`, [
                  newExpectation(
                    "should see see new branch ",
                    `[data-cy=${testParams.destinationBranch}]`,
                    beVisible,
                  ),
                ]),
              ],
            ),
          ]),
        ],
      )
    : newExpectationWithClickFlows(
        "should open branch selector",
        `[data-cy=branch-selector]`,
        beVisible,
        [
          newClickFlow(`[data-cy=branch-selector]`, [
            newExpectation(
              "should see see new branch ",
              `[data-cy=${testParams.destinationBranch}]`,
              beVisible,
            ),
          ]),
        ],
      ),
  newExpectationWithClickFlows(
    "should click on other branch",
    `[data-cy=${testParams.destinationBranch}]`,
    beVisible,
    [
      newClickFlow(
        `[data-cy=${testParams.destinationBranch}]`,
        checkCurrentBranch(testParams),
      ),
    ],
  ),
];
