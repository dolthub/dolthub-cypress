import { beVisible } from "cypress/e2e/utils/sharedTests/sharedFunctionsAndVariables";
import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
  scrollToPosition,
} from "../../../../utils/helpers";
import { Expectation } from "../../../../utils/types";

const pageName = "Bounties page";
const currentPage = "/bounties";

const shouldBeVisible = newShouldArgs("be.visible");

describe(`${pageName} renders expected components on different devices`, () => {
  const scrollToPositionInContainer = (
    position: Cypress.PositionType,
  ): Expectation => scrollToPosition("#main-content", position);

  // Tests go from top -> bottom
  const desktopTests = [
    newExpectation(
      "should render bounties page Get Started section",
      "[data-cy=bounties-get-started-section]",
      newShouldArgs("be.visible.and.contain", "Get Started"),
    ),
    newExpectation(
      "should render at least one repo list item",
      "[data-cy=repo-list-item]",
      newShouldArgs("have.length.of.at.least", 1),
    ),
    scrollToPositionInContainer("center"),
    newExpectation(
      "should render image in Intro section",
      "[data-cy=bounties-intro-section] img[src='/images/bounties-scoreboard.png']",
      shouldBeVisible,
    ),
    newExpectation(
      "should render bounties page Intro section",
      "[data-cy=bounties-intro-section]",
      newShouldArgs("be.visible.and.contain", [
        "INTRODUCING DATA BOUNTIES",
        "Get Paid to Source Data",
      ]),
    ),
    newExpectation(
      "should render bounties page Pay section",
      "[data-cy=bounties-pay-section]",
      newShouldArgs("be.visible.and.contain", "Pay for Data You Want"),
    ),
    newExpectationWithScrollIntoView(
      "should render image in Pay section",
      "[data-cy=bounties-pay-section] img[src='/images/bounties-pay-for-what-you-want.png']",
      beVisible,
      true,
    ),
  ];

  const mobileTests = [
    newExpectation(
      "should render bounties page Get Started section",
      "[data-cy=bounties-get-started-section]",
      newShouldArgs("be.visible.and.contain", "Get Started"),
    ),
    newExpectation(
      "should render bounties page Intro section",
      "[data-cy=bounties-intro-section]",
      newShouldArgs("be.visible.and.contain", [
        "INTRODUCING DATA BOUNTIES",
        "Get Paid to Source Data",
      ]),
    ),
    newExpectation(
      "should not render image in each section for mobile",
      [
        "[data-cy=bounties-intro-section] img",
        "[data-cy=bounties-pay-section] img",
        // "[data-cy=bounties-get-started-section] img",
      ],
      newShouldArgs("not.be.visible"),
    ),
    scrollToPositionInContainer("center"),
    newExpectation(
      "should render bounties page Pay section",
      "[data-cy=bounties-pay-section]",
      newShouldArgs("be.visible.and.contain", "Pay for Data You Want"),
    ),
  ];

  runTestsForDevices({
    currentPage,
    devices: allDevicesDiffTestsForSignedOut(
      pageName,
      desktopTests,
      desktopTests,
      mobileTests,
    ),
  });
});
