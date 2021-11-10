import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";

const pageName = "Profile Settings";
const currentPage = "/settings/profile";

const loggedIn = true;

const modalClickflow = newClickFlow(
  "[data-cy=edit-user-picture-button]",
  [],
  "[data-cy=cancel-button]",
);

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
    newExpectationWithClickFlows(
      "modal should open on clicking edit",
      "[data-cy=edit-user-picture-button]",
      newShouldArgs("be.visible"),
      [newClickFlow("[data-cy=edit-user-picture-button]", [])],
    ),
    // How would I tag the h2 title, or is that even necessary?
    newExpectation(
      "should render a button to browse files",
      "[data-cy=browse-picture-files-button]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render current avatar",
      "[data-cy=current-avatar]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render a disabled save button",
      "[data-cy=save-new-profile-pic-button]",
      newShouldArgs("be.disabled"),
    ),
    newExpectation(
      "should render a cancel button",
      "[data-cy=cancel-button]",
      newShouldArgs("be.visible"),
    ),
    newExpectationWithClickFlows(
      "modal should close on clicking the x",
      "[data-cy=close-modal]",
      newShouldArgs("be.visible"),
      [newClickFlow("[data-cy=close-modal]", [])],
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
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
