import {
  ClickFlow,
  Device,
  Expectation,
  ScrollTo,
  ScrollToPosition,
  ScrollToXY,
  Selector,
  ShouldArgs,
  Tests,
  TypeStringType,
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
  url: string,
  skip = false,
): Expectation {
  return { description, selector, shouldArgs, skip, url };
}

export function newExpectationWithClickFlow(
  description: string,
  selector: string,
  shouldArgs: ShouldArgs,
  clickFlow: ClickFlow,
  skip = false,
): Expectation {
  return { description, selector, shouldArgs, clickFlow, skip };
}

export function newExpectationWithScrollIntoView(
  description: string,
  selector: Selector,
  shouldArgs: ShouldArgs,
  scrollIntoView: boolean,
  skip = false,
): Expectation {
  return { description, selector, scrollIntoView, shouldArgs, skip };
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

// Click flows

export function newClickFlow(
  toClickBefore: Selector,
  expectations: Tests,
  toClickAfter?: Selector,
  force = false,
): ClickFlow {
  return {
    toClickBefore,
    expectations,
    toClickAfter,
    force,
  };
}

// Scroll to

export function scrollToPosition(
  selectorStr: string,
  position: Cypress.PositionType,
  options?: Partial<Cypress.ScrollToOptions> | undefined,
): Expectation {
  return newExpectationWithScrollTo(
    `should scroll to ${position} of ${selectorStr}`,
    selectorStr,
    newShouldArgs("be.visible"),
    newScrollToPosition(position, selectorStr, options),
  );
}

export function newScrollToPosition(
  position: Cypress.PositionType,
  selectorStr?: string,
  options?: Partial<Cypress.ScrollToOptions> | undefined,
): ScrollToPosition {
  return { position, selectorStr, options };
}

export function scrollToXY(
  selectorStr: string,
  x: string | number,
  y: string | number,
): Expectation {
  return newExpectationWithScrollTo(
    `should scroll to x: ${x}, y: ${y} of ${selectorStr}`,
    selectorStr,
    newShouldArgs("be.visible"),
    newScrollToXY(x, y, selectorStr),
  );
}

export function newScrollToXY(
  x: string | number,
  y: string | number,
  selectorStr?: string,
  options?: Partial<Cypress.ScrollToOptions>,
): ScrollToXY {
  return { x, y, selectorStr, options };
}

// Devices

export function newDevice(
  device: Cypress.ViewportPreset,
  description: string,
  tests: Tests,
  isMobile: boolean,
): Device {
  return { device, description, tests, isMobile };
}

// Should args

export function newShouldArgs(chainer: string, value?: any): ShouldArgs {
  return { chainer, value };
}

export function newExpectationWithSelector(
  description: string,
  selector: string,
  selectOption: number,
  shouldArgs: ShouldArgs,
): Expectation {
  return { description, selector, shouldArgs, selectOption };
}

export function newExpectationWithVisitPage(
  description: string,
  selector: string,
  shouldArgs: ShouldArgs,
  targetPage: string,
): Expectation {
  return { description, selector, shouldArgs, targetPage };
}

export function newExpectationWithFileUpload(
  description: string,
  selector: string,
  fileUpload: string,
  shouldArgs: ShouldArgs,
): Expectation {
  return { description, selector, shouldArgs, fileUpload };
}

export function newExpectationWithTypeString(
  description: string,
  selector: Selector,
  shouldArgs: ShouldArgs,
  typeString: TypeStringType,
  skip = false,
): Expectation {
  return { description, selector, shouldArgs, typeString, skip };
}
