import {
  newClickFlow,
  newExpectation,
  newExpectationWithSelector,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";
import { beVisibleAndContain } from "./sharedFunctionsAndVariables";

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
  [...checkRepoListForTab("most-recent", 20)],
);

export const mostRecentReposClickFlowMobile = newClickFlow(
  "[data-cy=discover-mobile-selector] input",
  [
    newExpectationWithSelector(
      "should select Discover",
      "[data-cy=discover-mobile-selector]>div>div>div",
      1,
      beVisibleAndContain("Discover"),
    ),
  ],
  "",
);
export const clearSearchClickFlow = newClickFlow(
  "[data-cy=clear-search-button]",
  [
    newExpectation(
      "should have repository search bar",
      "[data-cy=search-input]",
      newShouldArgs("be.visible.and.have.value", ""),
    ),
  ],
  "",
);
