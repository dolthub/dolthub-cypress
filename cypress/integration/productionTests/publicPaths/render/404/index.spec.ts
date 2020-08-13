import { runTestsForDevices } from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../../utils/helpers";

const pageName = "General 404 page";
const currentPage = "/404";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should render 404 page with title",
      "[data-cy=404-page]",
      newShouldArgs("be.visible.and.contain", "Page not found"),
    ),
    newExpectation(
      "should render 404 code block",
      "[data-cy=code-404-block]",
      beVisible,
    ),
    newExpectation(
      "should render links on 404 page",
      "[data-cy=404-page-links] a",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
