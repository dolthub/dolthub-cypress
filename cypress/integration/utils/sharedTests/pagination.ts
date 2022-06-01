import {
  newExpectation,
  newExpectationWithScrollTo,
  newScrollToPosition,
  newShouldArgs,
} from "../helpers";

const beVisible = newShouldArgs("be.visible");

const testPagination = (
  descBefore: string,
  beforeLen: number,
  descAfter: string,
  afterLen: number,
  itemsDataCy: string,
  scrollContainerDataCy: string,
) => [
  newExpectation(
    descBefore,
    itemsDataCy,
    newShouldArgs("be.visible.and.have.length.of.at.most", beforeLen),
  ),
  newExpectationWithScrollTo(
    "should paginate on scroll",
    scrollContainerDataCy,
    beVisible,
    newScrollToPosition("bottom", scrollContainerDataCy),
  ),
  newExpectation(
    descAfter,
    itemsDataCy,
    newShouldArgs("be.visible.and.have.length.of.at.least", afterLen),
  ),
];

export const testPaginationForTable = (
  tableDataCy: string,
  scrollContainerDataCy: string,
  beforeLen: number,
  afterLen = beforeLen + 10,
) =>
  testPagination(
    `should have no more than ${beforeLen} rows in table`,
    beforeLen,
    `should have at least ${afterLen} rows in table`,
    afterLen,
    `${tableDataCy} tr`,
    scrollContainerDataCy,
  );

export const testPaginationForList = (
  listDataCy: string,
  scrollContainerDataCy: string,
  beforeLen: number,
  afterLen = beforeLen + 10,
) =>
  testPagination(
    `should have no more than ${beforeLen} items in list`,
    beforeLen,
    `should have at least ${afterLen} items in list`,
    afterLen,
    `${listDataCy} li`,
    scrollContainerDataCy,
  );

export const testPaginationForRepoDataTable = testPaginationForTable(
  "[data-cy=desktop-repo-data-table]",
  "[id=main-content]",
  51,
);
