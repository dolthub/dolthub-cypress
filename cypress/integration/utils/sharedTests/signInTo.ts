import { newExpectation, newShouldArgs } from "../helpers";

export const testSignInTo = (msg: string) => [
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
