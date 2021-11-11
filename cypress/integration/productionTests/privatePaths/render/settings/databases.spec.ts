import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "Databases Settings";
const currentPage = "/settings/repositories";

const loggedIn = true;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render Settings header",
      "[data-cy=settings-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render Settings Databases link",
      "[data-cy=settings-databases-section-link]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should have a Databases header",
      "[data-cy=databases-header]",
      newShouldArgs("be.visible"),
    ),
    newExpectation(
      "should render an ordered list of all a user's databases",
      "[data-cy=repository-list-for-user]",
      newShouldArgs("be.visible"),
    ),
    /*
    Should there be more tests for databses? I feel like there 
    should be, but also that maybe it's tested somewhere else
    */
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
