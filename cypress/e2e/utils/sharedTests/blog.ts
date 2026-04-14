import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlow,
  newExpectationWithScrollIntoView,
  newExpectationWithURL,
  newShouldArgs,
} from "../helpers";
import { Expectation } from "../types";
import {
  beVisible,
  shouldBeVisible,
  shouldNotBeVisible,
  shouldNotExist,
  shouldTypeString,
} from "./sharedFunctionsAndVariables";

const skip = true; // TODO: Figure out why cypress can't click on next page button

export const encodeUrlString = (str: string) => str.split(" ").join("+");

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
    `/blog/?q=${encodeUrlString(q)}`,
  ),
  newExpectation(
    "should have matching articles message",
    "[data-cy=matching-articles]",
    newShouldArgs("be.visible.and.contain", [numMatching, "matching article"]),
  ),
  newExpectation(
    "should have one blog and tim update",
    "[data-cy=blog-list] > li",
    newShouldArgs("be.visible.and.have.length", numMatching + 1),
  ),
  newExpectation(
    `should have matching blog title for ${q}`,
    "[data-cy=blog-list] > li:first [data-cy=blog-title]",
    newShouldArgs("be.visible.and.contain", title),
  ),
  newExpectation(
    `should have matching blog url for ${q}`,
    "[data-cy=blog-list] > li:first [data-cy=blog-title]",
    newShouldArgs("have.attr", ["href", `/blog/${path}`]),
  ),
  shouldNotExist("page-buttons"),
];

const clearTagClickFlow = (tag: string) =>
  newClickFlow(`[data-cy=featured-tag-${tag}-active]`, [
    shouldNotExist(`featured-tag-${tag}-active`),
    shouldNotExist(`clear-tag-${tag}`),
    shouldNotBeVisible("matching-articles"),
  ]);

export const testSearchedTag = (tag: string): Expectation[] => [
  newExpectationWithURL(
    "should route to tag page",
    "[data-cy=blog-search-input]",
    beVisible,
    `/blog/?tags=${tag}`,
  ),
  shouldBeVisible("matching-articles"),
  shouldBeVisible(`nav-tag-${tag}`),
  shouldBeVisible(`clear-tag-${tag}`),
  shouldBeVisible(`featured-tag-${tag}-active`),
  newExpectation(
    "should have at least 10 blogs",
    "[data-cy=blog-list] > li",
    newShouldArgs("be.visible.and.have.length.of.at.least", 10),
  ),
  shouldNotExist("page-buttons"),
  newExpectationWithClickFlow(
    "should clear tag",
    `[data-cy=featured-tag-${tag}-active]`,
    beVisible,
    clearTagClickFlow(tag),
  ),
];

const mobileTagsClickFlow = (tag: string) =>
  newClickFlow(
    "[data-cy=blog-filter-button]",
    [shouldBeVisible(`tag-filter-${tag}-active`)],
    "[data-cy=blog-filter-button]",
  );

const mobileClearTagClickFlow = newClickFlow(
  "[data-cy=clear-tags-button]",
  [shouldNotBeVisible("matching-articles")],
  "[data-cy=blog-filter-button]",
);

export const testSearchedTagMobile = (tag: string): Expectation[] => [
  newExpectationWithURL(
    "should route to tag page",
    "[data-cy=blog-search-input]",
    beVisible,
    `/blog/?tags=${tag}`,
  ),
  shouldBeVisible("matching-articles"),
  newExpectationWithClickFlow(
    "should open tag popup",
    "[data-cy=blog-filter-button]",
    beVisible,
    mobileTagsClickFlow(tag),
  ),
  shouldBeVisible("blog-filter-button"),
  newExpectation(
    "should have at least 10 blogs",
    "[data-cy=blog-list] > li",
    newShouldArgs("be.visible.and.have.length.of.at.least", 10),
  ),
  shouldNotExist("page-buttons"),
  newExpectationWithClickFlow(
    "should clear tag",
    "[data-cy=blog-filter-button]",
    beVisible,
    mobileClearTagClickFlow,
  ),
  shouldNotExist(`tag-filter-${tag}-active`),
  shouldBeVisible(`tag-filter-${tag}`),
  newExpectationWithClickFlow(
    "should close tag popup",
    "[data-cy=blog-filter-button]",
    beVisible,
    newClickFlow("[data-cy=blog-filter-button]", []),
  ),
];

export const nextPageClickFlow = newClickFlow("[data-cy=page-num-2]", [
  shouldBeVisible("page-num-2-active"),
  shouldBeVisible("blog-prev-page"),
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
  shouldBeVisible("page-num-1-active"),
  newExpectationWithClickFlow(
    "should navigate to page 2",
    "[data-cy=page-num-2]",
    beVisible,
    nextPageClickFlow,
    skip,
  ),
];

export const testTimWeeklyUpdate = [
  shouldBeVisible("tim-weekly-update"),
  newExpectation(
    "should have disabled mailchimp submit button",
    "[data-cy=mailchimp-submit-button]",
    newShouldArgs("be.disabled"),
  ),
  shouldTypeString("mailchimp-input", "email@email.com", true),
  newExpectation(
    "should have enabled mailchimp submit button",
    "[data-cy=mailchimp-submit-button]",
    newShouldArgs("be.enabled"),
  ),
];
