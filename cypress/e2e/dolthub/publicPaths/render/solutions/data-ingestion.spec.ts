import {
  beVisible,
  beVisibleAndContain,
  shouldBeVisible,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";

import {
  desktopDevicesForSignedOut,
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
} from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Data-ingestion page";
const currentPage = "/solutions/data-ingestion";

const dataIngestionTests = [
  {
    scrollToCy: "top-right-title",
    text: "DATA IS CRITICAL",
  },
  {
    scrollToCy: "turbine-quote",
    text: "Dolt allows us to verify and test cancer genome data from our research partners around the world",
  },
  {
    scrollToCy: "bullet-query",
    text: "Query",
  },
  {
    scrollToCy: "bullet-script",
    text: "Script",
  },
  {
    scrollToCy: "bullet-version",
    text: "Version",
  },
  {
    scrollToCy: "dolt-in-action-top-container",
    text: "Dolt In Action",
  },
  {
    scrollToCy: "dolt-in-action-list",
  },
  {
    scrollToCy: "workflow-item",
  },
];

const topRightFindAndContain = {
  dataCy: "top-right-title",
  text: "DATA IS CRITICAL",
};

const exampleItemsFindAndContain = [
  {
    dataCy: "workflow-title",
    text: "The workflow file",
  },
  {
    dataCy: "script-title",
    text: "The script",
  },
  {
    dataCy: "output-title",
    text: "The output",
  },
];

describe(`${pageName} renders expected components on different devices`, () => {
  const commonTests = [
    shouldBeVisible("top-right-container"),
    shouldFindAndContain(
      topRightFindAndContain.dataCy,
      topRightFindAndContain.text,
    ),

    ...dataIngestionTests.map(test =>
      newExpectationWithScrollIntoView(
        `should find: ${test.scrollToCy}`,
        `[data-cy=${test.scrollToCy}]`,
        test.text ? beVisibleAndContain(test.text) : beVisible,
        true,
      ),
    ),
  ];

  const desktopAndTabletTests = [
    ...commonTests,
    newExpectation(
      "should find right button",
      "[aria-label=example-right-button]",
      beVisible,
    ),
    ...exampleItemsFindAndContain.map(find =>
      newExpectationWithClickFlow(
        `should find ${find.dataCy}`,
        `[data-cy=${find.dataCy}]`,
        beVisibleAndContain(find.text),
        newClickFlow("[aria-label=example-right-button]", []),
      ),
    ),
    newExpectation(
      "should find left button",
      "[aria-label=example-left-button]",
      beVisible,
    ),
  ];

  const mobileAndTabletTests = [
    ...commonTests,
    newExpectation(
      "should find right button",
      "[aria-label=mobile-example-right-button]",
      beVisible,
    ),
    ...exampleItemsFindAndContain.map(find =>
      newExpectationWithClickFlow(
        `should find ${find.dataCy}`,
        `[data-cy=${find.dataCy}]`,
        beVisibleAndContain(find.text),
        newClickFlow("[aria-label=mobile-example-right-button]", []),
      ),
    ),
    newExpectation(
      "should find left button",
      "[aria-label=mobile-example-left-button]",
      beVisible,
    ),
  ];

  const devices = [
    ...desktopDevicesForSignedOut(pageName, desktopAndTabletTests, false),
    iPad2ForAppLayout(pageName, desktopAndTabletTests),
    iPhoneXForAppLayout(pageName, mobileAndTabletTests),
  ];

  runTestsForDevices({ currentPage, devices });
});
