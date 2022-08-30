import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
} from "../helpers";
import { Expectation } from "../types";
import { beVisible } from "./sharedFunctionsAndVariables";

export type TabParams = {
  test: string;
  data_cy: string;
  find: string;
  text?: string;
  openMenu?: boolean;
};

export const loopTabsWithNewExpectation = (
  tabs: TabParams[],
  expectation: (tab: TabParams) => Expectation,
) =>
  tabs.map(tab =>
    newExpectationWithClickFlows(
      `should click to ${tab.test}`,
      `[data-cy=${tab.data_cy}]`,
      beVisible,
      [
        newClickFlow(`[data-cy=${tab.data_cy}]`, [
          newExpectation(
            `should find ${tab.find}`,
            `[data-cy=${tab.find}]`,
            beVisible,
          ),
          expectation(tab),
        ]),
      ],
    ),
  );
