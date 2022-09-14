import {
  beVisible,
  beVisibleAndContain,
  findAndBeVisible,
  findAndContains,
} from "cypress/e2e/utils/sharedTests/sharedFunctionsAndVariables";
import {
  topRightFindAndContain,
  topBottomFindAndContain,
  bulletQueryFindAndContain,
  bulletScriptFindAndContain,
  bulletVersionFindAndContain,
  doltInActionTopFindAndContain,
  doltInActionListFindAndContain,
  exampleItemsFindAndContain,
} from "../../../../utils/constants/data-IngestionConstants";
import { runTestsForDevices } from "../../../../utils";
import {
  desktopDevicesForSignedOut,
  iPad2ForAppLayout,
} from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
} from "../../../../utils/helpers";

const pageName = "Data-ingestion page";
const currentPage = "/solutions/data-ingestion";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    findAndBeVisible("top-right-container"),
    ...topRightFindAndContain.map(find =>
      findAndContains(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should scroll to top bottom section",
      "[data-cy=top-bottom-container]",
      beVisible,
      true,
    ),
    ...topBottomFindAndContain.map(find =>
      findAndContains(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find turbine quote",
      "[data-cy=turbine-quote]",
      beVisibleAndContain(
        "Dolt allows us to verify and test cancer genome data from our research partners around the world",
      ),
      true,
    ),

    newExpectationWithScrollIntoView(
      "should find Bullet: Query",
      "[data-cy=bullet-query]",
      beVisible,
      true,
    ),
    ...bulletQueryFindAndContain.map(find =>
      findAndContains(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find Bullet: Query",
      "[data-cy=bullet-query]",
      beVisible,
      true,
    ),
    ...bulletQueryFindAndContain.map(find =>
      findAndContains(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find Bullet: SQL",
      "[data-cy=bullet-script]",
      beVisible,
      true,
    ),
    ...bulletScriptFindAndContain.map(find =>
      findAndContains(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find Bullet: Version",
      "[data-cy=bullet-version]",
      beVisible,
      true,
    ),
    ...bulletVersionFindAndContain.map(find =>
      findAndContains(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find Dolt In Action: top container",
      "[data-cy=doltInAction-top-container]",
      beVisible,
      true,
    ),
    ...doltInActionTopFindAndContain.map(find =>
      findAndContains(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find Dolt In Action: List",
      "[data-cy=doltInAction-list]",
      beVisible,
      true,
    ),
    ...doltInActionListFindAndContain.map(find =>
      findAndContains(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find workflow item",
      "[data-cy=workflow-item]",
      beVisible,
      true,
    ),
    ...exampleItemsFindAndContain.map(
      find => (
        findAndContains(find.dataCyTitle, find.textTitle),
        findAndContains(find.dataCyDescription, find.textDescription),
        newExpectationWithClickFlows(
          "should find right button",
          "[aria-label=example-right-button]",
          beVisible,
          [newClickFlow("[aria-label=example-right-button]", [])],
        )
      ),
    ),
  ];

  const devices = [
    ...desktopDevicesForSignedOut(pageName, tests, false),
    iPad2ForAppLayout(pageName, tests),
  ];

  runTestsForDevices({ currentPage, devices });
});
