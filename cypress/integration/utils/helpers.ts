import {
  ClickFlow,
  Device,
  Expectation,
  ScrollIntoView,
  ScrollTo,
  ScrollToPosition,
  Selector,
  ShouldArgs,
  Tests,
} from "./types";

// Expectations

export function newExpectation(
  description: string,
  selector: Selector,
  shouldArgs: ShouldArgs,
  skip = false,
): Expectation {
  return { description, selector, shouldArgs, skip };
}

export function newExpectationWithURL(
  description: string,
  selector: Selector,
  shouldArgs: ShouldArgs,
  skip = false,
  url = "",
): Expectation {
  return { description, selector, shouldArgs, skip, url };
}

export function newExpectationWithRedirect(
  description: string,
  selector: Selector,
  shouldArgs: ShouldArgs,
  skip = false,
  redirect = "",
): Expectation {
  return { description, selector, shouldArgs, skip, redirect };
}

export function newExpectationWithClickFlows(
  description: string,
  selector: string,
  shouldArgs: ShouldArgs,
  clickFlows: ClickFlow[],
  skip = false,
): Expectation {
  return { description, selector, shouldArgs, clickFlows, skip };
}

export function newExpectationWithScrollTo(
  description: string,
  selector: string,
  shouldArgs: ShouldArgs,
  scrollTo: ScrollTo,
  skip = false,
): Expectation {
  return { description, selector, shouldArgs, scrollTo, skip };
}

export function newExpectationWithTypeString(
  description: string,
  selector: Selector,
  shouldArgs: ShouldArgs,
  typeString: string,
  skip = false,
): Expectation {
  return { description, selector, shouldArgs, typeString, skip };
}

// Click flows

export function newClickFlow(
  toClickBefore: Selector,
  expectations: Tests,
  toClickAfter?: Selector,
): ClickFlow {
  return {
    toClickBefore,
    expectations,
    toClickAfter,
  };
}

// Scroll to

export function scrollToPosition(
  selectorStr: string,
  position: Cypress.PositionType,
): Expectation {
  return newExpectationWithScrollTo(
    `should scroll to ${position} of ${selectorStr}`,
    selectorStr,
    newShouldArgs("be.visible"),
    newScrollToPosition(position, selectorStr),
  );
}

export function newScrollToPosition(
  position: Cypress.PositionType,
  selectorStr?: string,
  options?: Partial<Cypress.ScrollToOptions> | undefined,
): ScrollToPosition {
  return { position, selectorStr, options };
}

export function scrollIntoView(selectorStr: string): Expectation {
  return newExpectationWithScrollTo(
    `should scroll to top of ${selectorStr}`,
    selectorStr,
    newShouldArgs("be.visible"),
    newScrollIntoView(selectorStr),
  );
}

export function newScrollIntoView(
  selectorStr: string,
  options?: Partial<Cypress.ScrollIntoViewOptions> | undefined,
): ScrollIntoView {
  return { selectorStr, options };
}

// Devices

export function newDevice(
  device: Cypress.ViewportPreset,
  description: string,
  loggedIn: boolean,
  tests: Tests,
): Device {
  return { device, description, loggedIn, tests };
}

// Should args

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function newShouldArgs(chainer: string, value?: any): ShouldArgs {
  return { chainer, value };
}
