import { newClickFlow, newExpectationWithClickFlows } from "../helpers";
import { Expectation } from "../types";
import { beVisible } from "./sharedFunctionsAndVariables";

export type TabParams = {
  test: string;
  data_cy: string;
  find?: string;
  text?: string;
  openMenu?: boolean;
};

export const loopTabsWithNewExpectation = (
  tabs: TabParams[],
  func: (tab: TabParams) => Expectation,
) =>
  tabs.map(tab =>
    newExpectationWithClickFlows(
      `should click to ${tab.test}`,
      `[data-cy=${tab.data_cy}]`,
      beVisible,
      [newClickFlow(`[data-cy=${tab.data_cy}]`, [func(tab)])],
    ),
  );
