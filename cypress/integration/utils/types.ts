// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ShouldArgs = { chainer: string; value?: any };

export type Selector = string | string[];

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
};

export type Expectation = {
  description: string;
  selector: Selector;
  shouldArgs: ShouldArgs;
  clickFlows?: ClickFlow[] | undefined;
  scrollIntoView?: boolean;
  scrollTo?: ScrollTo;
  skip?: boolean;
  typeString?: string;
  redirect?: string;
  url?: string;
  waitTime?: number;
};

export type Tests = Expectation[];

export type Device = {
  device: Cypress.ViewportPreset;
  description: string;
  loggedIn: boolean;
  tests: Tests;
};

export type Devices = Device[];
