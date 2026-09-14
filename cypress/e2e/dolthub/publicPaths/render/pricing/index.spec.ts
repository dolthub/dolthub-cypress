import { allDevicesForSignedOut } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  beVisibleAndContain,
  notBeVisible,
  shouldBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Pricing page";
const currentPage = "/pricing";

type Product = {
  name: string;
  tagline: string;
  button: string;
};

type Section = {
  name: string;
  products: Product[];
};

// Taglines and button text come from the page's products.tsx. They identify a
// product rather than price it, so they outlast the numbers next to them.
const sections: Section[] = [
  {
    name: "databases",
    products: [
      { name: "dolt", tagline: "Git for data", button: "Download" },
      { name: "doltgres", tagline: "Dolt for Postgres", button: "Download" },
      { name: "doltlite", tagline: "Dolt for SQLite", button: "Download" },
    ],
  },
  {
    name: "services",
    products: [
      { name: "hosted-dolt", tagline: "AWS for Dolt", button: "Deploy" },
      { name: "dolthub", tagline: "GitHub for Dolt", button: "Sign up" },
      { name: "doltlab", tagline: "GitLab for Dolt", button: "Download" },
      { name: "workbench", tagline: "DataGrip for Dolt", button: "Download" },
    ],
  },
];

const pageTests = [
  shouldBeVisible("pricing-page"),
  shouldBeVisible("pricing-info"),
];

// Both layouts are always in the DOM and CSS picks one at the lg breakpoint,
// so each device asserts its own layout is shown *and* the other is not.
// Product buttons carry the same data-cy in both, hence the scoping.
const desktopTests = [
  ...pageTests,
  ...sections.flatMap(section => [
    newExpectation(
      `should show the ${section.name} table`,
      `[data-cy=${section.name}-table]`,
      beVisible,
    ),
    newExpectation(
      `should not show the ${section.name} cards`,
      `[data-cy=${section.name}-cards]`,
      notBeVisible,
    ),
    newExpectation(
      `should list every ${section.name} product in the table`,
      `[data-cy=${section.name}-table]`,
      beVisibleAndContain(section.products.map(p => p.tagline)),
    ),
    ...section.products.map(p =>
      newExpectation(
        `should find the ${p.name} button in the ${section.name} table`,
        `[data-cy=${section.name}-table] [data-cy=${p.name}-pricing-button]`,
        beVisibleAndContain(p.button),
      ),
    ),
  ]),
  // Replaces the enterprise card the redesign removed. The link has no
  // data-cy of its own, so it is reached through its href.
  newExpectation(
    "should offer enterprise support beneath the databases table",
    `[data-cy=databases-table] a[href="/support"]`,
    beVisibleAndContain("Enterprise Support"),
  ),
];

const mobileTests = [
  ...pageTests,
  ...sections.flatMap(section => [
    newExpectation(
      `should show the ${section.name} cards`,
      `[data-cy=${section.name}-cards]`,
      beVisible,
    ),
    newExpectation(
      `should not show the ${section.name} table`,
      `[data-cy=${section.name}-table]`,
      notBeVisible,
    ),
    ...section.products.flatMap(p => [
      newExpectationWithScrollIntoView(
        `should find and scroll to the ${p.name} card`,
        `[data-cy=${p.name}-card]`,
        beVisibleAndContain(p.tagline),
        true,
      ),
      newExpectation(
        `should find the ${p.name} button in its card`,
        `[data-cy=${p.name}-card] [data-cy=${p.name}-pricing-button]`,
        beVisibleAndContain(p.button),
      ),
    ]),
  ]),
  newExpectation(
    "should offer enterprise support beneath the databases cards",
    `[data-cy=databases-cards] a[href="/support"]`,
    beVisibleAndContain("Enterprise Support"),
  ),
];

describe(`${pageName} renders expected components on different devices`, () => {
  const devices = allDevicesForSignedOut(pageName, desktopTests, mobileTests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
