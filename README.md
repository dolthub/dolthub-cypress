# dolthub-cypress

![Run all Cypress tests](<https://github.com/dolthub/dolthub-cypress/workflows/Tests%20(DoltHub%20Prod)/badge.svg>)

A suite of [Cypress.io](https://docs.cypress.io/) tests written in Typescript to UI test [DoltHub](https://www.dolthub.com).

## Installation

```bash
$ yarn && yarn compile
```
* [Running Cypress on the Apple M1 ARM Architecture](https://www.cypress.io/blog/2021/01/20/running-cypress-on-the-apple-m1-silicon-arm-architecture-using-rosetta-2/) then you need to run the following: 
```bash
$ softwareupdate --install-rosetta --agree-to-license
```


## Running the tests

You can either run our Cypress suite against our deployed production (dolthub.com) or against the local webserver (`localhost:3000`).

To run the tests against production, you can simply run these commands:

```bash
# runs tests using the full UI in Chrome against prod (recommended)
$ yarn cy-open

# runs tests against prod (default browser is Electron)
$ yarn cy-run

# runs tests headless against prod (using Chrome)
$ yarn cy-chrome
```

To run the tests against the local webserver, make sure you have the server running. _(Please note: this option is only currently available for our DoltHub devs. If you want to add a test to our suite, please file [an issue](https://github.com/dolthub/dolthub-cypress/issues/new) or [pull request](https://github.com/dolthub/dolthub-cypress/pulls) so we can add the appropriate `data-cy` tag.)_

Then, to run the Cypress tests against the local server:

```bash
# runs tests in Chrome against local server
$ yarn cylo-open-dolthub

# runs tests against local server
$ yarn cylo-run-dolthub

# runs specific tests against local server
$ yarn cylo-run-dolthub --spec 'cypress/integration/dolthub/productionTests/publicPaths/render/database/*'
```

Running tests against our local webserver gets slightly more complicated when testing our [blog](https://www.dolthub.com/blog), which is a separate application (learn more about our front-end stack and architecture [here](https://www.dolthub.com/blog/2020-03-11-how-we-built-dolthub-stack-and-architecture/)). Cypress can only run against a single host, so running our `blog` tests against our local DoltHub server won't work (`localhost:3000/blog` does not exist, but `dolthub.com/blog` does). You can test our blog against their local webservers by running these commands:

```bash
# For the blog
$ yarn cylo-open-blog
$ yarn cylo-run-blog
```

All the dolthub tests are located in `cypress/integration/dolthub`.
All the doltlab tests are located in `cypress/integration/doltlab`.

### Private paths

To run the tests in the `privatePaths` folder you need to put the test username and password in a Cypress env file. Only DoltHub devs have access to this information and can run these tests locally. This file should not be checked in. The file should look like this:

```json
// cypress.env.json
{
  "TEST_USERNAME": "xxx",
  "TEST_PASSWORD": "xxx"
}
```

## Writing tests

To write tests, first, ensure that the element you want to test
has a `data-cy` attribute on it. This attribute is the main way we select elements within the cypress tests, using the `cy.get()` method.

For example, if you were going to test a Like button

```
  <button onClick="countLike();"> Like </button>
```

Add the `data-cy` attribute like this:

```
  <button data-cy="like-button" onClick="countLike();"> Like </button>
```

Then, to select the element in a cypress test you would do something like:
`cy.get("[data-cy=like-button]").click();`

We use this `data-cy` attribute on elements so that changes to a component or element do not break our tests' selectors, which happens frequently if selecting an element based on it's class or text. See the [Cypress documentation](https://docs.cypress.io/guides/references/best-practices.html) for more information about best practices.

## Cypress utility functions and types

To help in test writing, included are some helper functions (which can be found in `cypress/integration/utils`) designed to abstract away some of the details of cypress test writing and allow for a collection of tests to be written once, then tested across a variety of device sizes.

Most type definitions within `cypress/integration/utils/types.ts` have a corresponding `new[typeName]` function in `cypress/integration/utils/helpers.ts`. This helps with writing tests without worrying about the type requirements.

We'll go through the concepts the types were derived from:

### `Expectation`

An **`Expectation`** consists of a test description, an element to select, and some assertions to make about that element. The current helper function that creates `Expectation`s is **`newExpectation`**.

This is the type definition for an `Expectation`:

```ts
type Expectation = {
  description: string;
  selector: Selector;
  shouldArgs: ShouldArgs;
  clickFlows?: ClickFlow[] | undefined;
  scrollTo?: ScrollTo;
  skip?: boolean;
};
```

Let's create a sample `Expectation` for our previously described Like button element. For clarity, each parameter to the `newExpectation` helper function will be defined as it's own variable.

```ts
const testDescription = "should render a Like button";
const selectorString = "[data-cy=like-button]";
const shouldArgs = newShouldArgs("be.visible");
const skip = false;

const likeButtonRendersExp = newExpectation(
  testDescription,
  selectorString,
  shouldArgs,
  skip, // optional and defaults to false
);
```

`testDescription` explains what the test tests for, and, since Cypress uses `describe` and `it` testing blocks, test descriptions are usually written as if they are the description of the `it` testing block, reading all together:
"it should render a Like button".

Test writers will also be supplying a description to the the outer `describe` block that houses inner `describe` and `it` blocks, so for our example you can imagine a test looking something like:

```ts
const pageName = "Page";

describe(`${pageName} should render a Like button`, () => {
  it("should render a Like button", () => {
    // make assertions
  });
});
```

Getting back to our variablized parameters above, `selector` is the selector intended to be used with the `cy.get()` method. This method is optimized to traverse the DOM and find the element(s) containing the specified `data-cy` attributes.

### `ShouldArgs`

`shouldArgs` is another object intended to be used with Cypress's assertion method [`.should()`](https://docs.cypress.io/api/commands/should.html#Syntax).

```ts
type ShouldArgs = { chainer: string; value?: any };
```

`chainer` refers to the assertion string "be.visible". If you're not familiar with assertions, you can learn more [here](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Assertions). While "be.visible" does not require any values, some chainers like "have.length" require a value of a number. Here are some examples:

```ts
const beVisible = newShouldArgs("be.visible");
const haveLength = newShouldArgs("have.length", 10);
// note that if you need to provide more than one value you can do so in an array
const contain = newShouldArgs("contain", ["title1", "title2", "title3"]);
```

### `Device`

A **`Device`** contains either a predefined Cypress supported device specified by a certain `string` that maps to the device's name IRL, ie "macbook-13" or "iphone-6", or it's the custom height and width of a device's viewport (our utility functions currently only support the [predefined viewport presets](https://docs.cypress.io/api/commands/viewport.html#Arguments)). The value is passed into `cy.viewport()`. Each `Device` also comes with a description and a list of tests to run against the provided `viewport`.

```ts
type Device = {
  device: Cypress.ViewportPreset;
  description: string;
  loggedIn: boolean;
  tests: Tests;
};
```

Continuing with our example above, lets do two things to define the device we want to run `likeButtonRendersExp` on. First, we will make an array of all our `Expectation`s. These are our tests. Second, we will use `newDevice` to define an iphone6 to test on (we have some pre-baked `Device` helper functions in `cypress/integration/utils/device.ts`).

```ts
const deviceDescription = "iphone6 renders a Like button";
const deviceScreen = "iphone-6";
const loggedIn = false;

const tests = [likeButtonRendersExp];

const iphone6 = newDevice(deviceScreen, deviceDescription, loggedIn, tests);
```

`deviceDescription` above describes the test(s) we will be running on this device. Recall that our `testDescription` ran after the `it` for an
`it` test block, reading "it should render a Like button". `deviceDescription` runs after `describe` in a nested `describe` block, yielding a testing
structure like this:

```ts
const pageName = "Page";

describe(`${pageName} should render a Like button on all devices`, () => {
  describe(`${pageName} should render a Like button on iphone-6`, () => {
    it("should render a Like button", () => {
      // make assertions
    });
  });
});
```

`deviceScreen` is the predefined viewport size defined by Cypress and represented by the string "iphone-6".

`loggedIn` is a boolean representing whether this page requires authentication. Our tests currently only run against our logged out pages. We're working on support for running tests against our private pages.

Finally, `tests` are the collection of `Expectation`s defined that will run against this `Device`. The next and final step required to run our tests is the helper function: `runTestsForDevices`.

### `runTestsForDevices`

To use this function, it must be called inside a `describe` block, so let's put all our previously defined variables together to run a test on an "iphone-6", that checks if the Like button is rendered.

```ts
const pageName = "Page";
const currentPage = "/some-page";

describe(`${pageName} should render a Like button on all devices`, () => {
  const loggedIn = false;
  const testDescription = "should render a Like button";
  const selectorString = "[data-cy=like-button]";
  const assertionArgs = newShouldArgs("be.visible");

  const likeButtonRendersExp = newExpectation(
    testDescription,
    selectorString,
    assertionArgs,
  );

  const deviceScreen = "iphone-6";
  const deviceDescription = `should render a Like button on ${deviceScreen}`;

  const tests = [likeButtonRendersExp];

  const iphone6 = newDevice(deviceDescription, deviceScreen, loggedIn, tests);

  const devices = [iphone6];
  runTestsForDevices({ currentPage, devices });
});
```

Notice in the above test, just inside the `describe` block, we've defined the `currentPage` we want to test and we don't need authentication for this page, so `loggedIn` is `false`. We then define our `Expectation` `likeButtonRendersExp`, and our `Device` "iphone-6", and create an array of `Device`s to pass to `runTestsForDevices`.

First test on first device finished.

### `ClickFlow`

Now when we need to take some actions on a page, click some stuff, then assert some changes, etc. There's an additional helper methods to assist with this.

Let's imagine our Like button element changes some state and element when clicked:

```tsx
// some state manager somewhere
const [likes, setLikes] = useState(0)

// our Like button with a magic onClick method that updates state
<button data-cy="like-button" onClick={() => setLikes(likes + 1) }> Like </button>
<div data-cy="like-count">{likes}</div>
```

We can setup our test in a similar way to how we did before, only this time, instead of creating an `Expectation`, we want to create an `Expectation` with `ClickFlow`s.

A **`ClickFlow`** is conceptually like a story, in that it has a beginning a middle and an end. More specifically, it is a series of optional click actions, followed by a series of `Expectation`s, followed by another series of optional click actions. To simplify, a `ClickFlow` just wants to know what you want to be clicked first, then, what you want tested, then what you want to click on last.

```ts
type ClickFlow = {
  toClickBefore?: Selector; // can be a string or array of strings
  expectations: Expectation[];
  toClickAfter?: Selector;
};
```

So for our example above, we can think about the `ClickFlow` we want to define by thinking about how we might test this functionality if we were interacting with the UI directly. First we would assert the Like count to be `0`, it's initial value. Then we would want to click the Like button. Finally, we would want to assert that the Like count equaled `1`.

Here's how that `ClickFlow` might be defined using our helper functions `newClickFlow` and `newExpectationWithClickFlows`:

```ts
const likeButton = "[data-cy=like-button]";
const likeCount = "[data-cy=like-count]";

const containZero = newShouldArgs("to.contain", 0);
const containOne = newShouldArgs("to.contain", 1);

const singleLikeCountExp = newExpectation("", likeCount, containOne);

const testsBetweenClicks = [singleLikeCountExp];

const likeCountClickFlow = newClickFlow(
  // first click
  likeButton,

  // tests to run
  testsBetweenClicks,

  // last click, if any
);

const testDescription =
  "should increase Like count when Like button is clicked";

const clickFlows = [likeCountClickFlow];

const likeCountIncreasesExp = newExpectationWithClickFlows(
  testDescription,
  likeCount,
  containZero,
  clickFlows,
);
```

Again, we've variablized everything above in order to improve the readability a bit. Lets walk through it. `likeButton` and `likeCount` are the selectors we want to work with. They will be passed by way of the helper functions to `cy.get()`.

`containZero` and `containOne` are `ShouldArg`s that will be passed to Cypress's `.should()` method, and that method will then assert for an element contains either a `0` or a `1` respectively.

Next we make a simple `Expectation` that we want the test runner to run after we click the Like button and provide an empty string, as the description (it's not needed this deep).

Remember we want to make an assertion before we click the Like button, and an assertion after we click the Like button. We want the `Expectation` `singleLikeCountExp` to run after we click the Like button. All it tells the test runner to do is grab the Like count element, and make sure it contains `1`.

We then wrap that `Expectation` in an array, and give it the name `testsBetweenClicks`. It happens to only contain one test, but can contain more.

Now we are at our `ClickFlow` definition `likeCountClickFlow` which is the story we've created to make sure our Like button works correctly. The first argument we pass to `newClickFlow` is the string (or array of strings) we want Cypress to click first. And these strings are simply our selector strings, so we pass in the `likeButton` selector. This tells Cypress, click these first, evaluating in Cypress talk to `cy.get(selectorString).click()`.

When Cypress is finished clicking our initial selectors, our test runner will run the Expectations we've passed to to `newClickFlow` as the second argument.
Above, this argument is `testsBetweenClicks`. And as the variable name suggestions, after the initial clicks run, our runner will run all tests in `testsBetweenClicks`.

Finally, we can also define a selector(s) to be clicked after `testsBetweenClicks` finishes, but in our case, this isn't necessary, so we omit this argument.

That is a `ClickFlow` friends!

We write a simple description, `testDescription`, for our highest layer of tests and we add our `ClickFlows` to an array `clickFlows`.

Now we use our other helper function `newExpectationWithClickFlows` that accepts all the same arguments `newExpectation` takes with an additional argument, an array of `ClickFlow`s. These `ClickFlow`s will then run after the `Expectation` they are coupled to. To clarify, our `Expectation` with `ClickFlow`s above, `likeCountIncreasesExp`, will run the same way a simple `Expectation` will run. `likeCount` will be selected and expected to contain `0`, as the `containZero` argument specifies. After that, all attached `ClickFlow`s will run, meaning the `likeButton` will be clicked, and then the `likeCount` will be selected and expected to contain `1`.

### Putting it all together

That's it! All that remains is to wrap this in a testing `describe` block, and we now have a test that checks for state changes!

```ts
const pageName = "Page";
const currentPage = "/somePage";

describe(`${pageName} should render a Like button on all devices`, () => {
  const loggedIn = false;

  const likeButton = "[data-cy=like-button]";
  const likeCount = "[data-cy=like-count]";

  const containZero = newShouldArgs("to.contain", 0);
  const containOne = newShouldArgs("to.contain", 1);

  const singleLikeCountExp = newExpectation("", likeCount, containOne);

  const testsBetweenClicks = [singleLikeCountExp];

  const likeCountClickFlow = newClickFlow(
    // first click
    likeButton,

    // tests to run
    testsBetweenClicks,
  );

  const testDescription =
    "should increase Like count when Like button is clicked";

  const clickFlows = [likeCountClickFlow];

  const likeCountIncreasesExp = newExpectationWithClickFlows(
    testDescription,
    likeCount,
    containZero,
    clickFlows,
  );

  const deviceDescription = `${pageName} should render a Like button on all devices`;
  const deviceScreen = "iphone-6";

  const tests = [likeCountIncreasesExp];

  const iphone6 = newDevice(deviceDescription, deviceScreen, loggedIn, tests);

  const devices = [iphone6];
  runTestsForDevices({ currentPage, devices });
});
```

## Relevant Blogs

- https://www.dolthub.com/blog/2020-08-10-testing-dolthub-cypress/
- https://www.dolthub.com/blog/2020-08-17-cypress-open-source/
- https://www.dolthub.com/blog/2020-10-23-cypress-login-tests/
