import { newExpectation, newShouldArgs } from "../helpers";
import { Expectation, ShouldArgs, Tests } from "../types";

const exist = newShouldArgs("exist");

export const testDoltReleaseLink = (
  args: ShouldArgs,
  skip = false,
): Expectation =>
  newExpectation(
    "should have link for dolt release",
    "[data-cy=copy-dolt-release]",
    args,
    skip,
  );

export const testBlogArticles = (args: ShouldArgs): Expectation =>
  newExpectation(
    "should have a blog article list",
    "[data-cy=blog-posts]",
    args,
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
