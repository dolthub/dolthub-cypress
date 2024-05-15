import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const exist = newShouldArgs("exist");

const footerTags = [
  "[data-cy=footer-pricing]",
  "[data-cy=footer-documentation]",
  "[data-cy=footer-blog]",
  "[data-cy=footer-team]",
  "[data-cy=footer-security]",
  "[data-cy=footer-privacy]",
  "[data-cy=footer-terms]",
  "[data-cy=footer-social-links]",
  "[data-cy=footer-dolthub-logo]",
];

const doltLabFooterTags = ["[data-cy=footer-doltlab-logo]"];

export const testFooter: Tests = [
  newExpectationWithScrollIntoView(
    "should have footer",
    "[data-cy=site-footer]",
    exist,
    true,
  ),
  newExpectation("should have footer links and images", footerTags, exist),
];

export const testDoltLabFooter: Tests = [
  newExpectationWithScrollIntoView(
    "should have footer",
    "[data-cy=site-footer]",
    exist,
    true,
  ),
  newExpectation(
    "should have footer links and images",
    doltLabFooterTags,
    exist,
  ),
  newExpectation(
    "should have download doltlab button",
    "[data-cy=site-footer]",
    newShouldArgs("be.visible.and.contain", ["All rights reserved."]),
  ),
];
