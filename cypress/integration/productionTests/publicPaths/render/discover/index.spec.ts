import { runTestsForDevices } from "../../../../utils";
import { desktopDevicesForSignedOut } from "../../../../utils/devices";
import {
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import {
  checkRepoListForTab,
  mostRecentReposClickFlow,
} from "../../../../utils/sharedTests/reposContainer";
import { testHomepageSidecar } from "../../../../utils/sharedTests/sidecar";

const pageName = "Discover page";
const currentPage = "/discover";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  // const exist = newShouldArgs("exist");

  const testReposContainer = [
    newExpectation(
      "should have repository search bar",
      "[data-cy=search-input-signed-out]",
      beVisible,
    ),
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

  const desktopTests = [...testReposContainer, ...testHomepageSidecar];

  // const iPadTests = [...testReposContainer, ...testHomepageSidecar];

  // const iPhoneTests = [
  //   testBlogArticles(exist),
  //   ...testMobileRepoList("[data-cy=discover-repo-lists]"),
  //   ...testMobileMailingList("[data-cy=discover-mobile-mailing-list]"),
  // ];

  // const devices = allDevicesDiffTestsForSignedOut(
  //   pageName,
  //   desktopTests,
  //   iPadTests,
  //   iPhoneTests,
  // );
  const devices = desktopDevicesForSignedOut(pageName, desktopTests);

  runTestsForDevices({ currentPage, devices });
});
