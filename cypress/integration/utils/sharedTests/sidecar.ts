import { newExpectation, newShouldArgs } from "../helpers";
import { Expectation, ShouldArgs, Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
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

export const testHomepageSidecar: Tests = [
  testBlogArticles(beVisible),
  testDoltReleaseLink(exist),
];

export const testSidecar = (args: ShouldArgs, skip = false): Tests => [
  testDoltReleaseLink(args, skip),
  testCreateAccountLink(args, skip),
];
