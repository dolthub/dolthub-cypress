import {
  beVisible,
  beVisibleAndContain,
  shouldFindAndBeVisible,
  shouldFindAndContain,
} from "../../../../utils/sharedTests/sharedFunctionsAndVariables";
import {
  topRightFindAndContain,
  exampleItemsFindAndContain,
  dataIngestionTests,
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
    shouldFindAndBeVisible("top-right-container"),
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

    ...exampleItemsFindAndContain.map(
      find => (
        shouldFindAndContain(find.dataCy, find.text),
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
