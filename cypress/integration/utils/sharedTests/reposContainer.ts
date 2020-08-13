import { newClickFlow, newExpectation, newShouldArgs, Tests } from "..";

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
  "[data-cy=most-recent-repos-tab]",
  [...checkRepoListForTab("most-recent", 20)],
  "[data-cy=most-starred-repos-tab]",
);

export const testMobileRepoList = (dataCy: string): Tests => [
  newExpectation(
    "should have repo list with title on mobile",
    dataCy,
    newShouldArgs("be.visible.and.contain", [
      "Featured datasets",
      "Explore more public datasets on your desktop",
    ]),
  ),
];
