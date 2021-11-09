import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Profile Settings";
const currentPage = "/settings/profile";

const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Profile link",
      "[data-cy=settings-profile-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have an Edit Profile header",
      "[data-cy=edit-profile-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render the picture uploading form",
      "[data-cy=picture-upload-form]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have an input for username",
      "[data-cy=name-input]",
      newShouldArgs("be.visible.and.have.value", "cypresstesting"),
    ),
    newExpectation(
      "should have an input for user's biography",
      "[data-cy=bio-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have an input for user's website",
      "[data-cy=website-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have an input for user's location",
      "[data-cy=location-input]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have a submit profile settings button",
      "[data-cy=submit-profile-settings]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have a cancel button",
      "[data-cy=cancel-button]",
      newShouldArgs("be.visible"),
    ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, true, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
