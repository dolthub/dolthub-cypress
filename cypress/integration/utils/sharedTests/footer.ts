import { newExpectation, newShouldArgs } from "../../utils";

const exist = newShouldArgs("exist");

const footerTags = [
  "[data-cy=footer-about-dolthub]",
  "[data-cy=footer-contact]",
  "[data-cy=footer-blog]",
  "[data-cy=footer-documentation]",
  "[data-cy=footer-about-liquidata]",
  "[data-cy=footer-terms-of-service]",
  "[data-cy=footer-privacy-policy]",
  "[data-cy=footer-social-links]",
  "[data-cy=footer-dolthub-logo]",
  "[data-cy=footer-liquidata]",
];

export const testFooter = [
  newExpectation("should have footer", "[data-cy=site-footer]", exist),
  newExpectation("should have footer links and images", footerTags, exist),
];
