import { runTestsForDevices } from "../../../../../utils";
import { macbook15ForAppLayout } from "../../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../../utils/helpers";

const pageName = "Issues page for non-existent database";
const currentOwner = "automated_testing";
const currentRepo = "corona-virus";
const currentPage = `repositories/${currentOwner}/${currentRepo}/deploy`;

describe(`${pageName} expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should find hosted button",
      "[data-cy=hosted-button]",
      beVisible,
    ),
    newExpectation(
      "should find repo does not exist message",
      "[data-cy=hosted-button]",
      beVisible,
    ),
    newExpectation(
      "should find link to sign in",
      "[data-cy=sign-in-with-redirect-link]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
