import { runTestsForDevices } from "../../../../utils";
import { macbook15ForAppLayout } from "../../../../utils/devices";
import {
  newClickFlow,
//   newExpectation,
  newShouldArgs,
  newExpectationWithClickFlows,
//   newExpectationWithScrollIntoView,
} from "../../../../utils/helpers";

const pageName = "Creating, Editing, and Deleting a readme";
const currentOwner = "automated_testing";
const currentRepo = "readme_testing_repo";
const currentPage = `repositories/${currentOwner}/${currentRepo}/settings`;
const loggedIn = true;

const beVisible = newShouldArgs("be.visible");
// const notExist = newShouldArgs("not.exist");
// const beVisibleAndContain = (value: string) =>
//   newShouldArgs("be.visible.and.contain", value);


describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectationWithClickFlows(
        "should have functioning nav dropdown",
        "[data-cy=dropdown-database-nav]",
        beVisible,
        [newClickFlow("[data-cy=dropdown-database-nav]", [], "[data-cy=dropdown-database-nav]"),]
    )
    // newExpectation(
    //   "should have Settings header",
    //   "[data-cy=repo-settings-header]",
    //   beVisible,
    // ),
    // newExpectationWithClickFlows(
    //   "should have a Delete Database button that opens a modal",
    //   "[data-cy=delete-database-button]",
    //   beVisible,
    //   [deleteDatabaseModalClickflow],
    // ),
  ];
  const skip = false;
  const devices = [macbook15ForAppLayout(pageName, tests, false, loggedIn)];
  runTestsForDevices({ currentPage, devices, skip });
});
