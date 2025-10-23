import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newExpectationWithURL,
  newShouldArgs,
} from "../helpers";
import { Expectation } from "../types";

const beVisible = newShouldArgs("be.visible");
const currentPage = Cypress.env("LOCAL_BLOG") ? "/" : "/blog/";
const skip = true;

export const testSearched = (
  q: string,
  title: string,
  path: string,
  numMatching = 1,
): Expectation[] => [
  newExpectationWithURL(
    "should route to query page",
    "[data-cy=blog-search-input]",
    newShouldArgs("be.visible.and.have.value", q),
    `${currentPage}?q=${encodeURIComponent(q)}`,
    skip,
  ),
  newExpectation(
    "should have matching articles message",
    "[data-cy=matching-articles]",
    newShouldArgs("be.visible.and.contain", [numMatching, "matching article"]),
  ),
  newExpectation(
    "should have one blog",
    "[data-cy=blog-list] > li",
    newShouldArgs("be.visible.and.have.length", numMatching),
  ),
  newExpectation(
    `should have matching blog title for ${q}`,
    "[data-cy=blog-list] > li:first [data-cy=blog-title]",
    newShouldArgs("be.visible.and.contain", title),
  ),
  newExpectation(
    `should have matching blog url for ${q}`,
    "[data-cy=blog-list] > li:first [data-cy=blog-title]",
    newShouldArgs("have.attr", ["href", `${currentPage}${path}`]),
  ),
  newExpectation(
    "should not have bottom page buttons",
    "[data-cy=page-buttons]",
    newShouldArgs("not.exist"),
  ),
];

export const nextPageClickFlow = newClickFlow("[data-cy=page-num-2] a", [
  newExpectation(
    "should have active second page button",
    "[data-cy=page-num-2-active]",
    beVisible,
  ),
  newExpectation(
    "should have previous page button",
    "[data-cy=blog-prev-page]",
    beVisible,
  ),
]);

export const testBlogIndexNoSearch = [
  newExpectation(
    "should not have matching articles message",
    "[data-cy=matching-articles]",
    newShouldArgs("is.hidden"),
  ),
  newExpectation(
    "should have more than one blog article",
    "[data-cy=blog-list] > li",
    newShouldArgs("be.visible.and.have.length.of.at.least", 10),
  ),
  newExpectationWithScrollIntoView(
    "should have bottom page buttons",
    "[data-cy=page-buttons]",
    beVisible,
    true,
  ),
  newExpectation(
    "should have active first page button",
    "[data-cy=page-num-1-active]",
    beVisible,
  ),
  newExpectation(
    "should not have previous page button",
    "[data-cy=blog-prev-page]",
    newShouldArgs("not.exist"),
  ),
  newExpectationWithClickFlow(
    "should navigate to page 2",
    "[data-cy=blog-next-page]",
    beVisible,
    nextPageClickFlow,
    skip,
  ),
];
