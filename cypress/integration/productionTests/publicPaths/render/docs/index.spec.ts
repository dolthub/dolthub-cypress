import { runTestsForDevices } from "../../../../utils";
import {
  desktopDevicesForAppLayout,
  iPad2ForAppLayout,
} from "../../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../../../../utils/helpers";
import { Expectation, ShouldArgs } from "../../../../utils/types";

const pageName = "Docs page";
const currentPage = Cypress.env("LOCAL_DOCS")
  ? "/tutorials/installation"
  : "/docs/";
const skip = !!Cypress.env("LOCAL_BLOG") || !!Cypress.env("LOCAL_DOLTHUB");

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const exist = newShouldArgs("exist");
  const notExist = newShouldArgs("not.exist");

  const newExpectationWithSkip = (
    desc: string,
    tag: string,
    args: ShouldArgs,
  ): Expectation => {
    return newExpectation(desc, tag, args, skip);
  };

  const testTableOfContents = [
    newExpectationWithSkip(
      "should have docs sidebar table of contents",
      "[data-cy=docs-table-of-contents]",
      beVisible,
    ),
    newExpectationWithSkip(
      "should have active tutorials section",
      "[data-cy=section-header-tutorials-active]",
      beVisible,
    ),
    newExpectationWithSkip(
      "should have active tutorials section with expanded list",
      "[data-cy=section-header-tutorials-active] > ol > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 5),
    ),
    newExpectationWithSkip(
      "should have active installation subsection",
      "[data-cy=heading-list-installation-active]",
      beVisible,
    ),
    newExpectationWithSkip(
      "should have visible subsection list",
      "[data-cy=sub-section-list-tutorials]",
      beVisible,
    ),
    newExpectationWithSkip(
      "should have inactive guides section without expanded list",
      "[data-cy=sub-section-list-guides-inactive]",
      exist,
    ),
    newExpectationWithSkip(
      "should have inactive reference section without expanded list",
      "[data-cy=sub-section-list-reference-inactive]",
      exist,
    ),
  ];

  const testDocsArticle = newExpectationWithSkip(
    "should have docs article with header",
    "[data-cy=docs-main] > article > header",
    beVisible,
  );

  const guidesClickFlow = newClickFlow(
    "[data-cy=section-header-guides]",
    [
      newExpectationWithSkip(
        "",
        "[data-cy=section-header-guides-active]",
        beVisible,
      ),
      newExpectationWithSkip(
        "",
        "[data-cy=section-header-guides-active] > ol > li",
        newShouldArgs("be.visible.and.have.length.of.at.least", 1),
      ),
      newExpectationWithSkip(
        "should have inactive tutorials section without expanded list",
        "[data-cy=sub-section-list-tutorials-inactive]",
        exist,
      ),
    ],
    "[data-cy=section-header-guides-active] > ol > li:first",
  );

  const referenceClickFlow = newClickFlow(
    "[data-cy=section-header-reference]",
    [
      newExpectationWithSkip(
        "",
        "[data-cy=section-header-reference-active]",
        beVisible,
      ),
      newExpectationWithSkip(
        "",
        "[data-cy=section-header-reference-active] > ol > li",
        newShouldArgs("be.visible.and.have.length.of.at.least", 4),
      ),
      newExpectationWithSkip(
        "should have inactive guides section without expanded list",
        "[data-cy=sub-section-list-guides-inactive]",
        exist,
      ),
    ],
    "[data-cy=section-header-reference-active] > ol > li:first",
  );

  const tests = [
    newExpectationWithSkip(
      "should have docs sidebar",
      "[data-cy=docs-sidebar]",
      beVisible,
    ),
    ...testTableOfContents,
    testDocsArticle,
    newExpectationWithClickFlows(
      "should open guide section when clicked",
      "[data-cy=section-header-guides]",
      beVisible,
      [guidesClickFlow],
      skip,
    ),
    testDocsArticle,
    newExpectationWithSkip(
      "should have active SQL sync subsection",
      "[data-cy=heading-list-sql-sync-active]",
      beVisible,
    ),
    newExpectationWithClickFlows(
      "should open reference section when clicked",
      "[data-cy=section-header-reference]",
      beVisible,
      [referenceClickFlow],
      skip,
    ),
    testDocsArticle,
    newExpectationWithSkip(
      "should have active CLI subsection",
      "[data-cy=heading-list-cli-active]",
      beVisible,
    ),
  ];

  const devices = [
    ...desktopDevicesForAppLayout(pageName, tests),
    iPad2ForAppLayout(pageName, tests),
  ];

  runTestsForDevices({ currentPage, devices });
});
