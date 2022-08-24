import { runTestsForDevices } from "../../../../utils";
import {
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "cypresstesting users page";
const username = "cypresstesting";
const currentPage = `/users/cypresstesting`;
const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");
  const notBeVisible = newShouldArgs("not.be.visible");
  const skip = false;

  const commonTest = [
    newExpectation(
      "should show profile card",
      "[data-cy=profile-card]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show profile card profile pic",
      "[data-cy=profile-card-pic]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show profile card profile bio",
      "[data-cy=profile-card-bio]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show profile summary",
      "[data-cy=profile-summary]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should not show next steps",
      "[data-cy=profile-card-next-steps]",
      notExist,
      skip,
    ),
    newExpectation(
      "should show tabs container",
      "[data-cy=org-profile-tabs-container]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show Databases tab",
      "[data-cy=user-profile-databases-tab]",
      beVisible,
      skip,
    ),
    newExpectation(
      "should show no repos message",
      "[data-cy=no-repos-msg]",
      beVisible,
    ),
  ];

  const testDesktop = [
    newExpectation(
      "should show profile card profile name",
      "[data-cy=profile-card-name-desktop]",
      newShouldArgs("be.visible.and.contain", username),
      skip,
    ),
    newExpectation(
      "should have create database button",
      "[data-cy=create-database-button]",
      beVisible,
      skip,
    ),
  ];

  const testProfileCardMobile = [
    newExpectation(
      "should show profile card profile name",
      "[data-cy=profile-card-name-mobile]",
      newShouldArgs("be.visible.and.contain", username),
      skip,
    ),
  ];

  const desktopTests = [...commonTest, ...testDesktop];
  const mobileTests = [...commonTest, ...testProfileCardMobile];
  const devices = [
    macbook15ForAppLayout(pageName, desktopTests, false, loggedIn),
    iPhoneXForAppLayout(pageName, mobileTests, loggedIn),
  ];

  runTestsForDevices({ currentPage, devices });
});
