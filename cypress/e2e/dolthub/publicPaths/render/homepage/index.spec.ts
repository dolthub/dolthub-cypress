import { allDevicesForSignedOut } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Homepage";
const currentPage = "/";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "renders expected headers",
      "#main-content",
      newShouldArgs("be.visible.and.contain", [
        "We Build Databases for Agents",
        "Agents for Everything that isn't Code",
        "From our blog",
        "Dolt is Git for Data",
        "Diff, Branch, and Merge",
        "You Already Know How to Use It",
        "The Dolt Ecosystem",
      ]),
    ),
    // The hero carries a strip naming the database each product is compatible
    // with. The captions are asserted rather than the logos because the images
    // are next/legacy/image and only resolve once in view.
    newExpectation(
      "renders hero compatibility strip",
      "#main-content",
      newShouldArgs("be.visible.and.contain", [
        "MySQL-compatible",
        "Postgres-compatible",
        "SQLite-compatible",
      ]),
    ),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
