export type ShouldArgs = { chainer: string; value?: any };

export type Selector = string | string[];
export type TypeStringType = {
  value: string;
  eq?: number;
  skipClear?: boolean;
  withWarmup?: boolean;
};
export type ScrollToPosition = {
  position: Cypress.PositionType;
  selectorStr?: string;
  options?: Partial<Cypress.ScrollToOptions>;
};

export type ScrollToXY = {
  x: string | number;
  y: string | number;
  selectorStr?: string;
  options?: Partial<Cypress.ScrollToOptions>;
};

export type ScrollIntoView = {
  selectorStr: string;
  options?: Partial<Cypress.ScrollIntoViewOptions>;
};

export type ScrollTo = ScrollToPosition | ScrollToXY | ScrollIntoView;

export type ClickFlow = {
  toClickBefore?: Selector;
  // eslint-disable-next-line no-use-before-define
  expectations: Expectation[];
  toClickAfter?: Selector;
  force?: boolean;
};

export type Expectation = {
  description: string;
  selector: Selector;
  shouldArgs: ShouldArgs;
  clickFlow?: ClickFlow;
  scrollIntoView?: boolean;
  scrollTo?: ScrollTo;
  skip?: boolean;
  typeString?: TypeStringType;
  selectOption?: number;
  targetPage?: string;
  fileUpload?: string;
  redirect?: string;
  url?: string;
};

export type Tests = Expectation[];

export type Device = {
  device: Cypress.ViewportPreset;
  description: string;
  tests: Tests;
  isMobile: boolean;
};

export type Devices = Device[];
