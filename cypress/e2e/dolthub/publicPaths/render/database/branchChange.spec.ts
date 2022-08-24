import { runTestsForDevices } from "../../../../utils";
import {
  iPad2ForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";

const pageName = "Database page with tables and docs";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const desktopAndIpadTests = () => [
    newExpectation(
      "should not find empty database",
      "[data-cy=repo-data-table-empty]",
      notExist,
    ),
    newExpectation(
      "should not find database table data",
      "[data-cy=repo-data-table]",
      notExist,
    ),
    newExpectationWithClickFlows(
      "should have branch selector",
      `[data-cy=branch-selector]`,
      newShouldArgs("be.visible.and.contain", "master"),

      [
        newClickFlow(`[data-cy=branch-selector]`, [
          newExpectation(
            "should have branch selector",
            `[data-cy=branch-selector]`,
            beVisible,
          ),
        ]),
      ],
    ),
    newExpectationWithClickFlows(
      "should click on other branch",
      `[data-cy=archived]`,
      beVisible,
      [
        newClickFlow(`[data-cy=archived]`, [
          newExpectation(
            "Pages loads back",
            `[data-cy=branch-selector]`,
            newShouldArgs("be.visible.and.contain", "archived"),
          ),
        ]),
      ],
    ),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests()),
    iPad2ForAppLayout(pageName, desktopAndIpadTests()),
  ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
