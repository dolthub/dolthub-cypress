import { newExpectation, newShouldArgs, Selector, ShouldArgs, Tests } from "..";

const exist = newShouldArgs("exist");

export const testMailingForm = (args: ShouldArgs): Tests => [
  newExpectation(
    "should render mailing list form",
    "[data-cy=mailing-list-form]",
    args,
  ),
  newExpectation(
    "should have mailing list input",
    "[data-cy=mailchimp-input]",
    args,
  ),
  newExpectation(
    "should have mailing list submit button",
    "[data-cy=mailchimp-submit-button]",
    args,
  ),
];

export const testMobileMailingList = (dataCy: Selector): Tests => [
  newExpectation(
    "should have option to sign up for mailing list on mobile",
    dataCy,
    newShouldArgs("exist.and.contain", [
      "Not quite ready to sign up?",
      "Sign up for helpful resources and release updates",
    ]),
  ),
  ...testMailingForm(exist),
];
