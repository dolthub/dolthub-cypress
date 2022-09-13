import {
  beVisible,
  beVisibleAndContain,
  findAndBeVisible,
  findAndContains,
} from "cypress/e2e/utils/sharedTests/sharedFunctionsAndVariables";
import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectationWithScrollIntoView } from "../../../../utils/helpers";

const pageName = "Data-ingestion page";
const currentPage = "/solutions/data-ingestion";

describe(`${pageName} renders expected components on different devices`, () => {
  const topRightFindAndContain = [
    { dataCy: "top-right-title", text: "DATA IS CRITICAL" },
    { dataCy: "top-right-header", text: "Do you trust your data sources?" },
    { dataCy: "top-right-list-item-one", text: "How do you know when" },
    {
      dataCy: "top-right-list-item-two",
      text: "How fast can you recover from bad data?",
    },
    {
      dataCy: "top-right-list-item-three",
      text: "How quickly can you identify it?",
    },
  ];

  const topBottomFindAndContain = [
    { dataCy: "top-bottom-title", text: "REMOVING THE RISK" },
    { dataCy: "top-bottom-header", text: "Dolt versions data like code" },
    { dataCy: "top-bottom-list-item-one", text: "Cell level version control" },
    {
      dataCy: "top-bottom-list-item-two",
      text: "Human and machine readable data diffs",
    },
    {
      dataCy: "top-bottom-list-item-three",
      text: "Instantaneous rollback and rollforward of data versions",
    },
    {
      dataCy: "top-bottom-list-item-four",
      text: "A pull request workflow for ad-hoc updates, complete with CI/CD",
    },
  ];

  const bulletQueryFindAndContain = [
    { dataCy: "bullet-query-header", text: "Query" },
    { dataCy: "bullet-query-item-one", text: "Full SQL interface" },
    { dataCy: "bullet-query-item-two", text: "Query any version from SQL" },
    { dataCy: "bullet-query-item-three", text: "Identify cell level changes" },
  ];

  const bulletScriptFindAndContain = [
    { dataCy: "bullet-script-header", text: "Script" },
    {
      dataCy: "bullet-script-item-one",
      text: "Test incoming data with scriptable business logic",
    },
    {
      dataCy: "bullet-script-item-two",
      text: "Run validations against only deltas for efficient testing",
    },
  ];

  const bulletVersionFindAndContain = [
    { dataCy: "bullet-version-header", text: "Version" },
    {
      dataCy: "bullet-version-item-one",
      text: "Track a cell value through time",
    },
    {
      dataCy: "bullet-version-item-two",
      text: "Script logic for time series analyses",
    },
    {
      dataCy: "bullet-version-item-three",
      text: "Rollback and rollforward instantly",
    },
  ];

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
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
