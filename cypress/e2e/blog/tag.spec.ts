import {
  testBlogIndexNoSearch,
  testSearchedTag,
  testSearchedTagMobile,
  testTimWeeklyUpdate,
} from "@sharedTests/blog";
import { allDevicesForSignedOut } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldNotBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";
import { Tests } from "@utils/types";

const pageName = "Blog list page with tag";
const tag = "ai";
const currentPage = `/blog/?tags=${tag}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = (t: Tests): Tests => [
    shouldBeVisible("featured-blogs"),
    ...t,
    ...testBlogIndexNoSearch,
    ...testTimWeeklyUpdate,
  ];

  const desktopTests = tests([
    shouldNotBeVisible("blog-filter-button"),
    ...testSearchedTag(tag),
  ]);
  const mobileTests = tests([
    shouldNotBeVisible("tag-nav"),
    ...testSearchedTagMobile(tag),
  ]);

  const devices = allDevicesForSignedOut(pageName, desktopTests, mobileTests);
  runTestsForDevices({
    currentPage,
    devices,
  });
});
