import { allDevicesForSignedOut } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Pricing page";
const currentPage = "/pricing";

const pricingTests = [
  {
    card: "dolt-card",
    name: "dolt",
    shouldFind: [
      {
        datacy: "dolt-header",
        text: "GIT FOR DATA",
      },
      {
        datacy: "download-dolt-button",
        text: "Download for free",
      },
    ],
  },
  {
    card: "hosted-dolt-card",
    name: "hosted-dolt",
    shouldFind: [
      {
        datacy: "hosted-dolt-header",
        text: "DOLT IN THE CLOUD",
      },
      {
        datacy: "hosted-dolt-get-started-button",
        text: "Get Started",
      },
      {
        datacy: "hosted-dolt-pricing-link",
        text: "See detailed pricing",
      },
    ],
  },
  {
    card: "dolthub-card",
    name: "dolthub",
    shouldFind: [
      {
        datacy: "dolthub-header",
        text: "FORKS, CLONES, & PULLS REQUESTS",
      },
      {
        datacy: "dolthub-sign-up-button",
        text: "Sign up",
      },
      {
        datacy: "dolthub-pro-button",
        text: "Get DoltHub Pro",
      },
    ],
  },
  {
    card: "doltlab-card",
    name: "doltlab",
    shouldFind: [
      {
        datacy: "doltlab-header",
        text: "SELF-HOSTED DOLTHUB",
      },
      {
        datacy: "doltlab-download-button",
        text: "Download for free",
      },
      {
        datacy: "doltlab-contact-link",
        text: "Contact Enterprise Sales ",
      },
    ],
  },
  {
    card: "enterprise-card",
    shouldFind: [
      {
        datacy: "enterprise-header",
        text: "Enterprise Support",
      },
      {
        datacy: "enterprise-contact-button",
        text: "Contact Sales",
      },
    ],
  },
];

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    ...pricingTests
      .map(test => [
        newExpectationWithScrollIntoView(
          `should find and scroll to ${test.card} pricing section`,
          `[data-cy=${test.card}]`,
          beVisible,
          true,
        ),
        ...test.shouldFind.map(find =>
          shouldFindAndContain(find.datacy, find.text),
        ),

        ...(test.name
          ? [
              newExpectationWithClickFlows(
                "should click on the enterprise card button",
                `[data-cy=enterprise-card-${test.name}]`,
                beVisible,
                [
                  newClickFlow(`[data-cy=enterprise-card-${test.name}]`, [
                    newExpectation(
                      "should find the enterprise card",
                      `[data-cy=enterprise-card]`,
                      beVisible,
                    ),
                  ]),
                ],
              ),
            ]
          : []),
      ])
      .flat(),
  ];

  const devices = allDevicesForSignedOut(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
