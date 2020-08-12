import {
  newExpectation,
  newShouldArgs,
  runTestsForDevices,
} from "../../../../utils";
import { allDevicesForSignedOut } from "../../../../utils/devices";

const pageName = "General 404 page";
const currentPage = "/404";

describe(`${pageName} renders expected components on different devices`, function () {
  const shouldArgs = newShouldArgs("be.visible");

  const tests = [
    newExpectation(
      "should render 404 page with title",
      "[data-cy=404-page]",
      newShouldArgs("be.visible.and.contain", "Page not found"),
    ),
    newExpectation(
      "should render 404 code block",
      "[data-cy=code-404-block]",
      shouldArgs,
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
