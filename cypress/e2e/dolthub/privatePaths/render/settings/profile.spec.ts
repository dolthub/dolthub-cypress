import { beVisible } from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Profile Settings";
const currentPage = "/settings/profile";

const loggedIn = true;

const modalClickflow = newClickFlow(
  "[data-cy=edit-user-picture-button]",
  [
    newExpectation(
      "should render a Upload New Picture header",
      "[data-cy=modal-title]",
      beVisible,
    ),
    newExpectation(
      "should render a button to browse files",
      "[data-cy=browse-picture-files-button]",
      beVisible,
    ),
    newExpectation(
      "should render current avatar",
      "[data-cy=current-avatar]",
      beVisible,
    ),
    newExpectation(
      "should render a disabled save button",
      "[data-cy=save-new-profile-pic-button]",
      newShouldArgs("be.disabled"),
    ),
    newExpectation(
      "should render a cancel button",
      "[data-cy=cancel-button]",
      beVisible,
    ),
  ],
  "[data-cy=close-modal]",
);

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      beVisible,
    ),
    newExpectation(
      "should render Settings Profile link",
      "[data-cy=settings-profile-section-link]",
      beVisible,
    ),
    newExpectation(
      "should render the picture uploading form",
      "[data-cy=picture-upload-form]",
      beVisible,
    ),
    newExpectationWithClickFlows(
      "modal should open on clicking edit",
      "[data-cy=edit-user-picture-button]",
      beVisible,
      [modalClickflow],
    ),
    newExpectation(
      "should have an input for username",
      "[data-cy=name-input]",
      newShouldArgs("be.visible.and.have.value", "cypresstesting"),
    ),
    newExpectation(
      "should have an input for user's biography",
      "[data-cy=bio-input]",
      beVisible,
    ),
    newExpectation(
      "should have an input for user's website",
      "[data-cy=website-input]",
      beVisible,
    ),
    newExpectation(
      "should have an input for user's location",
      "[data-cy=location-input]",
      beVisible,
    ),
    newExpectation(
      "should have a submit profile settings button",
      "[data-cy=submit-profile-settings]",
      beVisible,
    ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
