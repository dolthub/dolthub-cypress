import {
  newExpectation,
  newExpectationWithScrollTo,
  newScrollToPosition,
  newShouldArgs,
} from "../helpers";

const beVisible = newShouldArgs("be.visible");

export const testPaginationForTable = (
  tableDataCy: string,
  scrollContainerDataCy: string,
  beforeLen: number,
  afterLen = beforeLen + 10,
) => [
  newExpectation(
    `should have no more than ${beforeLen} rows in table`,
    `${tableDataCy} tr`,
    newShouldArgs("be.visible.and.have.length.of.at.most", 51),
  ),
  newExpectationWithScrollTo(
    "should paginate on scroll",
    scrollContainerDataCy,
    beVisible,
    newScrollToPosition("bottom", scrollContainerDataCy),
  ),
  newExpectation(
    `should have at least ${afterLen} rows in table`,
    `${tableDataCy} tr`,
    newShouldArgs("be.visible.and.have.length.of.at.least", afterLen),
  ),
];

export const testPaginationForRepoDataTable = testPaginationForTable(
  "[data-cy=repo-data-table]",
  "[id=main-content]",
  51,
);
