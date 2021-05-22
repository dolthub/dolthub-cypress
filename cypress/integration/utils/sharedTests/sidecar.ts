import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { Expectation, ShouldArgs, Tests } from "../types";

const exist = newShouldArgs("exist");

export const testDoltReleaseLink = (
  args: ShouldArgs,
  skip = false,
): Expectation =>
  newExpectationWithScrollIntoView(
    "should have link for dolt release",
    "[data-cy=copy-dolt-release]",
    args,
    true,
    skip,
  );

export const testBlogArticles = (args: ShouldArgs): Expectation =>
  newExpectation(
    "should have a blog article list",
    "[data-cy=blog-posts]",
    args,
  );

export const testCreateAccountLink = (
  args: ShouldArgs,
  skip = false,
): Expectation =>
  newExpectation(
    "should have link to Create an account",
    "[data-cy=growthpanel-create-account]",
    args,
    skip,
  );

export const testDiscordCard = newExpectation(
  "should have Discord card",
  "[data-cy=join-discord-card]",
  exist,
);

export const testHomepageSidecar: Tests = [
  testDiscordCard,
  testBlogArticles(exist),
  testDoltReleaseLink(exist),
];

export const testSidecar = (args: ShouldArgs, skip = false): Tests => [
  testDoltReleaseLink(args, skip),
  testCreateAccountLink(args, skip),
];
