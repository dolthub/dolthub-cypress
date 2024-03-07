import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newExpectationWithSelector,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";
import { beVisibleAndContain, notExist } from "./sharedFunctionsAndVariables";

const beVisible = newShouldArgs("be.visible");

export const checkRepoListForTab = (
  listKind: string,
  length: number,
): Tests => {
  const dataCy = `[data-cy=repository-list-${listKind}]`;
  return [
    newExpectation(`should have list of ${listKind} repos`, dataCy, beVisible),
    newExpectation(
      `should have at least ${length} ${listKind} repos`,
      `${dataCy} > li`,
      newShouldArgs("be.visible.and.have.length.of.at.least", length),
    ),
  ];
};
export const mostRecentReposClickFlow = newClickFlow(
  "[data-cy=discover-repos-tab]",
  [...checkRepoListForTab("most-recent", 15)],
);

export const mostRecentReposClickFlowMobile = newClickFlow(
  "[data-cy=discover-mobile-selector] input",
  [
    newExpectationWithSelector(
      "should select Discover",
      "[data-cy=discover-mobile-selector]>div>div>div",
      2,
      beVisibleAndContain("Discover"),
    ),
  ],
  "",
);
export const clearSearchClickFlow = newClickFlow(
  "[data-cy=clear-repolist-search]",
  [
    newExpectation(
      "should have repository search bar",
      "[data-cy=repolist-search-input]",
      newShouldArgs("be.visible.and.have.value", ""),
    ),
  ],
  "",
);

const checkCollapseForkList = (isMobile: boolean) =>
  isMobile
    ? [
        newExpectationWithClickFlow(
          "should find hide forks button",
          "[data-cy=show-toggle-forks-button-mobile]:first",
          beVisible,
          newClickFlow(
            "[data-cy=show-toggle-forks-button-mobile]:first",
            [
              newExpectation(
                "should not show fork list",
                "[data-cy=fork-list]",
                notExist,
              ),
            ],
            "",
          ),
        ),
      ]
    : [
        newExpectationWithScrollIntoView(
          "should scroll to show collapse fork list button",
          "[data-cy=collapse-fork-list-button]",
          beVisible,
          true,
        ),
        newExpectationWithClickFlow(
          "should have show collapse fork list button",
          "[data-cy=collapse-fork-list-button]",
          beVisible,
          newClickFlow(
            "[data-cy=collapse-fork-list-button]",
            [
              newExpectation(
                "should not show fork list",
                "[data-cy=fork-list]",
                notExist,
              ),
            ],
            "",
          ),
        ),
      ];

export const uncheckShowForkListOption = newExpectationWithClickFlow(
  "should check show fork list option",
  "[data-cy=filter-button]",
  beVisible,
  newClickFlow(
    "[data-cy=filter-button]",
    [
      newExpectationWithClickFlow(
        "should uncheck show fork list option",
        "[data-cy=show-fork-repos-checkbox-checkbox]",
        beVisible,
        newClickFlow("[data-cy=show-fork-repos-checkbox-checkbox]", []),
      ),
    ],
    "[data-cy=filter-button]",
  ),
);

export const checkForkList = (isMobile: boolean) => [
  newExpectationWithScrollIntoView(
    "should have show forks button",
    `[data-cy=show-toggle-forks-button${isMobile ? "-mobile" : ""}]`,
    beVisible,
    true,
  ),
  newExpectationWithClickFlow(
    "should have show forks button",
    `[data-cy=show-toggle-forks-button${isMobile ? "-mobile" : ""}]`,
    beVisible,
    newClickFlow(
      `[data-cy=show-toggle-forks-button${isMobile ? "-mobile" : ""}]`,
      [
        newExpectationWithScrollIntoView(
          "should show fork list",
          "[data-cy=fork-list]",
          beVisible,
          true,
        ),

        newExpectation(
          "should have at least 3 forks",
          "[data-cy=fork-list] li",
          newShouldArgs("be.visible.and.have.length.of.at.least", 1),
        ),
      ],
      "",
    ),
  ),
  ...checkCollapseForkList(isMobile),
];

export const clearSearchTest = [
  newExpectationWithClickFlow(
    "should successfully clear search",
    "[data-cy=clear-repolist-search]",
    beVisible,
    clearSearchClickFlow,
  ),
  newExpectationWithScrollIntoView(
    "should scroll to footer",
    "[data-cy=site-footer]",
    beVisible,
    true,
  ),
  ...checkRepoListForTab("most-recent", 40),
];
