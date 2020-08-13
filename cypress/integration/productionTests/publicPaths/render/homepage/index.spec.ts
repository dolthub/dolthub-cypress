import { runTestsForDevices } from "../../../../utils";
import { allDevicesDiffTestsForSignedOut } from "../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
  scrollIntoView,
  scrollToPosition,
} from "../../../../utils/helpers";
import { testMobileMailingList } from "../../../../utils/sharedTests/mailingList";
import { pricingModalClickFlow } from "../../../../utils/sharedTests/navbar";
import {
  checkRepoListForTab,
  mostRecentReposClickFlow,
  testMobileRepoList,
} from "../../../../utils/sharedTests/reposContainer";
import {
  testBlogArticles,
  testDoltReleaseLink,
} from "../../../../utils/sharedTests/sidecar";
import { Expectation } from "../../../../utils/types";

const pageName = "Homepage";
const currentPage = "/";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const exist = newShouldArgs("exist");

  const scrollToPositionInContainer = (
    position: Cypress.PositionType,
  ): Expectation => {
    return scrollToPosition("#scroll-container", position);
  };

  const testHero = [
    newExpectation(
      "should have hero with correct titles",
      "[data-cy=home-page-hero-desktop]",
      newShouldArgs("be.visible.and.contain", [
        "Welcome to DoltHub",
        "Version Controlled Database",
        "Collaboration Platform",
      ]),
    ),
    newExpectationWithClickFlows(
      "should open pricing modal on see pricing click",
      "[data-cy=see-pricing-button-desktop]",
      beVisible,
      [pricingModalClickFlow("[data-cy=see-pricing-button-desktop]")],
    ),
  ];

  const testMobileHero = [
    newExpectation(
      "should have mobile hero with correct titles",
      "[data-cy=home-page-hero-mobile]",
      newShouldArgs("be.visible.and.contain", [
        "Welcome to DoltHub",
        "Version Controlled Database",
        "Collaboration Platform",
      ]),
    ),
    newExpectation(
      "should have list of details in hero on mobile",
      "[data-cy=hero-mobile-list]",
      beVisible,
    ),
  ];

  const testReposContainer = [
    scrollIntoView("[data-cy=repos-container-with-tabs]"),
    newExpectation(
      "should have repos container",
      "[data-cy=repos-container-with-tabs]",
      newShouldArgs("be.visible.and.contain", [
        "Featured",
        "Most recent",
        "Most starred",
      ]),
    ),
    ...checkRepoListForTab("featured", 5),
    newExpectationWithClickFlows(
      "should have list of most-recent repos",
      "[data-cy=most-recent-repos-tab]",
      beVisible,
      [mostRecentReposClickFlow],
    ),
    ...checkRepoListForTab("most-starred", 20),
  ];

  const testSearchInput = newExpectation(
    "should have repository search bar",
    "[data-cy=search-input-signed-out]",
    beVisible,
  );

  const testSidecars = [
    scrollIntoView("[data-cy=homepage-growth-panel-sm]"),
    testDoltReleaseLink(beVisible),
    scrollIntoView("[data-cy=home-page-about]"),
    newExpectation(
      "should have an about section",
      "[data-cy=home-page-about] > p",
      newShouldArgs("be.visible.and.have.length", 3),
    ),
    testBlogArticles(beVisible),
  ];

  const desktopTests = [
    ...testHero,
    testSearchInput,
    ...testSidecars,
    scrollToPositionInContainer("top"),
    ...testReposContainer,
  ];

  const iPadTests = [
    scrollToPositionInContainer("top"),
    newExpectation(
      "should have create account button on iPad",
      "[data-cy=hero-mobile-create-account-button]",
      beVisible,
    ),
    ...testMobileHero,
    testSearchInput,
    scrollToPositionInContainer("center"),
    ...testReposContainer,
    ...testSidecars,
  ];

  const iPhoneTests = [
    scrollToPositionInContainer("top"),
    ...testMobileHero,
    testBlogArticles(exist),
    scrollToPositionInContainer("center"),
    ...testMobileRepoList("[data-cy=homepage-repo-lists]"),
    ...testMobileMailingList("[data-cy=homepage-mobile-mailing-list]"),
  ];

  const devices = allDevicesDiffTestsForSignedOut(
    pageName,
    desktopTests,
    iPadTests,
    iPhoneTests,
  );

  runTestsForDevices({ currentPage, devices });
});
