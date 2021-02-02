import { newExpectation, newShouldArgs } from "../helpers";
import { Tests } from "../types";

export const testLoggedOutSignInTo = (msg: string): Tests => [
  newExpectation(
    "should show suggest sign in for a logged out user",
    "[data-cy=sign-in-to-do-something-prompt]",
    newShouldArgs("be.visible.and.contain", msg),
  ),
  newExpectation(
    "should show sign in link component for logged out user",
    "[data-cy=sign-in-with-redirect-link]",
    newShouldArgs("be.visible.and.contain", "sign in"),
  ),
];

export const testLoggedInSignInTo = [
  newExpectation(
    "should not suggest sign in for a logged in user",
    "[data-cy=sign-in-to-do-something-prompt]",
    newShouldArgs("not.exist"),
  ),
  newExpectation(
    "should not show sign in link component for logged in user",
    "[data-cy=sign-in-with-redirect-link]",
    newShouldArgs("not.exist"),
  ),
] as Tests;
