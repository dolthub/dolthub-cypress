import { newExpectation, newShouldArgs } from "../helpers";
import { Tests } from "../types";

const exist = newShouldArgs("exist");

const footerTags = [
  "[data-cy=footer-contact]",
  "[data-cy=footer-blog]",
  "[data-cy=footer-documentation]",
  "[data-cy=footer-team]",
  "[data-cy=footer-terms-of-service]",
  "[data-cy=footer-privacy-policy]",
  "[data-cy=footer-social-links]",
  "[data-cy=footer-dolthub-logo]",
];

export const testFooter: Tests = [
  newExpectation("should have footer", "[data-cy=site-footer]", exist),
  newExpectation("should have footer links and images", footerTags, exist),
];
