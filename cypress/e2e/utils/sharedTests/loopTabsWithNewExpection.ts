import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
} from "../helpers";
import { Expectation, Tests } from "../types";
import { beVisible } from "./sharedFunctionsAndVariables";

export type TabParams = {
  tabName: string;
  tabDataCy: string;
  dataCyToFind: string;
  textToFind?: string;
  isLeftNavClosed?: boolean;
};

export const loopTabsWithNewExpectation = (
  tabs: TabParams[],
  expectation: (tab: TabParams) => Expectation,
): Tests =>
  tabs.map(tab =>
    newExpectationWithClickFlow(
      `should click on the ${tab.tabName} tab`,
      `[data-cy=${tab.tabDataCy}]`,
      beVisible,
      newClickFlow(`[data-cy=${tab.tabDataCy}]`, [
        newExpectation(
          `should find ${tab.dataCyToFind}`,
          `[data-cy=${tab.dataCyToFind}]`,
          beVisible,
        ),
        expectation(tab),
      ]),
    ),
  );
