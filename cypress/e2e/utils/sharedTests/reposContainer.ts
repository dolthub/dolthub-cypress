import { Tests } from "@utils/types";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newShouldArgs,
} from "../helpers";
import {
  beVisible,
  shouldBeVisible,
  shouldBeVisibleAndScrollIntoView,
  shouldNotExist,
} from "./sharedFunctionsAndVariables";

export const checkRepoListForTab = (
  listKind: string,
  length: number,
): Tests => {
  const dataCy = `[data-cy=repository-list-${listKind}]`;
  return [
    shouldBeVisible(`repository-list-${listKind}`),
    newExpectation(
      `should have at least ${length} ${listKind} repos`,
      `${dataCy} > li`,
      newShouldArgs("be.visible.and.have.length.of.at.least", length),
    ),
  ];
};

export const clearSearchClickFlow = newClickFlow(
  "[data-cy=clear-repolist-search]",
  [
    newExpectation(
      "should have repository search bar",
      "[data-cy=repolist-search-input]",
      newShouldArgs("be.visible.and.have.value", ""),
    ),
  ],
);

const checkCollapseForkList = (isMobile: boolean) =>
  isMobile
    ? [
        newExpectationWithClickFlow(
          "should find hide forks button",
          "[data-cy=show-toggle-forks-button-mobile]:first",
          beVisible,
          newClickFlow("[data-cy=show-toggle-forks-button-mobile]:first", [
            shouldNotExist("fork-list"),
          ]),
        ),
      ]
    : [
        shouldBeVisibleAndScrollIntoView("collapse-fork-list-button"),
        newExpectationWithClickFlow(
          "should have show collapse fork list button",
          "[data-cy=collapse-fork-list-button]",
          beVisible,
          newClickFlow("[data-cy=collapse-fork-list-button]", [
            shouldNotExist("fork-list"),
          ]),
        ),
      ];

export const shouldUncheckForkListOption = newExpectationWithClickFlow(
  "should uncheck show fork list option",
  "[data-cy=show-fork-repos-checkbox-checkbox]",
  beVisible,
  newClickFlow("[data-cy=show-fork-repos-checkbox-checkbox]", []),
);

export const uncheckShowForkListOption = newExpectationWithClickFlow(
  "should check show fork list option",
  "[data-cy=filter-button]",
  beVisible,
  newClickFlow(
    "[data-cy=filter-button]",
    [shouldUncheckForkListOption],
    "[data-cy=filter-button]",
  ),
);

export const checkForkList = (isMobile: boolean) => [
  shouldBeVisibleAndScrollIntoView(
    `show-toggle-forks-button${isMobile ? "-mobile" : ""}`,
  ),
  newExpectationWithClickFlow(
    "should have show forks button",
    `[data-cy=show-toggle-forks-button${isMobile ? "-mobile" : ""}]`,
    beVisible,
    newClickFlow(
      `[data-cy=show-toggle-forks-button${isMobile ? "-mobile" : ""}]`,
      [
        shouldBeVisibleAndScrollIntoView("fork-list"),
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
  shouldBeVisibleAndScrollIntoView("site-footer"),
  ...checkRepoListForTab("most-recent", 14),
];
