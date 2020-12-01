import { newDevice } from "./helpers";
import { testFooter } from "./sharedTests/footer";
import {
  testMobileNavbar,
  testSignedInNavbar,
  testSignedOutNavbar,
} from "./sharedTests/navbar";
import { Device, Devices, Tests } from "./types";

// Creates devices

// AppLayout means the page is using the `AppLayout` component
// i.e. no footer and uses `SignedinNavbar` when logged in

// SignedOut means the page is using the `SignedOutLayout` component
// i.e. footer should be present, and mobile navbar works, loggedIn = false

export const macbook15 = (pageName: string, tests: Tests, loggedIn: boolean) =>
  newDevice(
    "macbook-15",
    `${pageName} renders expected components on macbook-15`,
    loggedIn,
    tests,
  );

export const macbook11 = (pageName: string, tests: Tests, loggedIn: boolean) =>
  newDevice(
    "macbook-11",
    `${pageName} renders expected components on macbook-11`,
    loggedIn,
    tests,
  );

export const iPad2 = (pageName: string, tests: Tests, loggedIn: boolean) =>
  newDevice(
    "ipad-2",
    `${pageName} renders expected components on ipad-2`,
    loggedIn,
    tests,
  );

export const iPhoneX = (pageName: string, tests: Tests, loggedIn: boolean) =>
  newDevice(
    "iphone-x",
    `${pageName} renders expected components on iphone-x`,
    loggedIn,
    tests,
  );

// App layout

export const macbook15ForAppLayout = (
  pageName: string,
  tests: Tests,
  skipNavbar = false,
  loggedIn = false,
): Device => {
  const t = getAppLayoutTests(tests, skipNavbar, loggedIn);
  return macbook15(pageName, t, loggedIn);
};

export const iPad2ForAppLayout = (pageName: string, tests: Tests): Device => {
  return iPad2(pageName, getAppLayoutTests(tests), false);
};

export const desktopDevicesForAppLayout = (
  pageName: string,
  tests: Tests,
  skipNavbar = false,
  loggedIn = false,
) => {
  const t = getAppLayoutTests(tests, skipNavbar, loggedIn);
  return [macbook15(pageName, t, loggedIn), macbook11(pageName, t, loggedIn)];
};

function getAppLayoutTests(tests: Tests, skipNavbar = false, loggedIn = false) {
  if (skipNavbar) return tests;
  if (loggedIn) {
    return [...testSignedInNavbar, ...tests];
  }
  return [...testSignedOutNavbar, ...tests];
}

// SignedOut layout

export const mobileDevicesForSignedOut = (
  pageName: string,
  tests: Tests,
): Devices => [
  iPad2(pageName, getSignedOutMobileTests(tests), false),
  iPhoneX(pageName, getSignedOutMobileTests(tests), false),
];

export const desktopDevicesForSignedOut = (pageName: string, tests: Tests) => {
  const t = getSignedOutTests(tests);
  return [macbook15(pageName, t, false), macbook11(pageName, t, false)];
};

export const allDevicesForSignedOut = (
  pageName: string,
  desktopTests: Tests,
  mobileTests: Tests,
) => [
  ...desktopDevicesForSignedOut(pageName, desktopTests),
  ...mobileDevicesForSignedOut(pageName, mobileTests),
];

export const allDevicesDiffTestsForSignedOut = (
  pageName: string,
  desktopTests: Tests,
  iPadTests: Tests,
  iPhoneTests: Tests,
) => [
  ...desktopDevicesForSignedOut(pageName, desktopTests),
  iPad2(pageName, getSignedOutMobileTests(iPadTests), false),
  iPhoneX(pageName, getSignedOutMobileTests(iPhoneTests), false),
];

function getSignedOutMobileTests(t: Tests): Tests {
  return [...testMobileNavbar, ...t, ...testFooter];
}

function getSignedOutTests(t: Tests): Tests {
  return [...testSignedOutNavbar, ...t, ...testFooter];
}
