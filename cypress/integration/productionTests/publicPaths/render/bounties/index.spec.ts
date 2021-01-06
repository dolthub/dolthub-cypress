import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Bounties page";
const currentPage = "/bounties";

const shouldBeVisible = newShouldArgs("be.visible");

describe(`${pageName} renders expected components on different devices`, () => {
  const desktopTests = [
    newExpectation(
      "should render image in Intro section",
      "[data-cy=bounties-intro-section] img[src='/images/bounties-scoreboard.png']",
      shouldBeVisible,
    ),
    newExpectation(
      "should render image in Pay section",
      "[data-cy=bounties-pay-section] img[src='/images/bounties-pay-for-what-you-want.png']",
      shouldBeVisible,
    ),
    newExpectation(
      "should render RepoListItem in Get Started section",
      "[data-cy=repo-list-item]",
      newShouldArgs("have.length", 1),
    ),
    newExpectation(
      "should render a RepoListItem with a bounty",
      "[data-cy=repo-list-item] [data-cy=bounty-award-link]",
      shouldBeVisible,
    ),
  ];

  const mobileTests = [
    newExpectation(
      "should render image in each section for Desktop",
      [
        "[data-cy=bounties-intro-section] img",
        "[data-cy=bounties-pay-section] img",
        "[data-cy=bounties-get-started-section] img",
      ],
      newShouldArgs("not.be.visible"),
    ),
  ];

  const tests = [
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
    newExpectation(
      "should render bounties page Get Started section",
      "[data-cy=bounties-get-started-section]",
      newShouldArgs("be.visible.and.contain", "Get Started"),
    ),
  ];

  const desktopAndTablet = [...desktopTests, ...tests];
  const mobile = [...mobileTests, ...tests];
  runTestsForDevices({
    currentPage,
    devices: allDevicesDiffTestsForSignedOut(
      pageName,
      desktopAndTablet,
      desktopAndTablet,
      mobile,
    ),
  });
});
