import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newShouldArgs,
} from "../helpers";
import { Expectation } from "../types";

export const beVisible = newShouldArgs("be.visible");
export const notBeVisible = newShouldArgs("not.be.visible");
export const notExist = newShouldArgs("not.exist");
export const exist = newShouldArgs("exist");
export const beVisibleAndContain = (value: string | string[]) =>
  newShouldArgs("be.visible.and.contain", value);
export const beChecked = newShouldArgs("be.checked");
export const notBeChecked = newShouldArgs("not.be.checked");
export const haveLength = (length: number) =>
  newShouldArgs("be.visible.and.have.length", length);
export const haveLengthAtLeast = (length: number) =>
  newShouldArgs("be.visible.and.have.length.of.at.least", length);

export const shouldBeVisible = (dataCy: string, desc?: string): Expectation =>
  newExpectation(
    `should find ${desc ?? getDesc(dataCy)}`,
    `[data-cy=${dataCy}]`,
    beVisible,
  );

export const shouldFindAndContain = (
  dataCy: string,
  text: string | string[],
  desc?: string,
): Expectation =>
  newExpectation(
    `should find ${desc ?? getDesc(dataCy)}`,
    `[data-cy=${dataCy}]`,
    beVisibleAndContain(text),
  );

export const shouldNotExist = (dataCy: string): Expectation =>
  newExpectation(
    `should not find ${getDesc(dataCy)}`,
    `[data-cy=${dataCy}]`,
    notExist,
  );

export function shouldSelectOption(
  optionToSelect: string,
  selectorDataCy: string,
  selectorIdx: number,
  optionIdx: number,
  currentValue?: string,
): Expectation {
  return newExpectationWithClickFlows(
    `should select ${optionToSelect}`,
    `[data-cy=${selectorDataCy}]`,
    currentValue ? beVisibleAndContain(currentValue) : beVisible,
    [
      newClickFlow(
        `[data-cy=${selectorDataCy}]`,
        [
          newExpectation(
            `should have ${optionToSelect}`,
            `[id=react-select-${selectorIdx}-option-${optionIdx}]`,
            beVisibleAndContain(optionToSelect),
          ),
        ],
        `[id=react-select-${selectorIdx}-option-${optionIdx}]`,
      ),
    ],
  );
}

function getDesc(dataCy: string): string {
  return dataCy.replace(/-/g, " ");
}

export const typingExpectation = (value: string, selectorStr: string) =>
  newExpectationWithTypeString(
    `should write description in textbox`,
    selectorStr,
    beVisible,
    { value },
  );

// type function for spread sheet input
export function getTypeInGridTests(grids: string[][], skipClear = false) {
  const tests: Expectation[] = [];
  grids.forEach((row: string[], rowidx: number) => {
    row.forEach((val: string, colidx: number) => {
      tests.push(
        newExpectationWithTypeString(
          `should enter value in row ${rowidx} in column ${colidx}`,
          `[aria-rowindex="${rowidx + 2}"]>[aria-colindex="${colidx + 2}"]`,
          beVisible,
          // The first character activates the cell so that we can type. It is
          // not included in the typed value.
          { value: `0${val}`, skipClear },
        ),
      );
    });
  });
  return tests;
}

export function checkValueInGridTests(grids: string[][]) {
  const tests: Expectation[] = [];
  grids.forEach((row: string[], rowidx: number) => {
    row.forEach((val: string, colidx: number) => {
      tests.push(
        newExpectation(
          `should have value in row ${rowidx} in column ${colidx}`,
          `[aria-rowindex="${rowidx + 2}"]>[aria-colindex="${colidx + 2}"]`,
          beVisibleAndContain(val),
        ),
      );
    });
  });
  return tests;
}
export const gatsbyServerBuildErrors = ["Minified React error"];
