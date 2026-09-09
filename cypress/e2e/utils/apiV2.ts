interface PullSummary {
  title: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  pull_number: number;
}

// Pull numbers for the shared automated_testing fixtures are not stable. They
// differ per environment because each one was seeded independently -- the
// "Crowdsourced" pull is 5 on prod but 1 on dev -- and they shift when older
// pulls are deleted. Look the pull up by title so the specs pass against prod,
// dev and the dev previews without hardcoding a number for each.
export function getPullNumberByTitle(
  pullsUrl: string,
  title: string,
): Cypress.Chainable<number> {
  return cy
    .request({ url: pullsUrl })
    .its("body.data")
    .then((pulls: PullSummary[]) => {
      const pull = pulls.find(p => p.title === title);
      if (!pull) {
        throw new Error(`no pull titled "${title}" at ${pullsUrl}`);
      }
      return pull.pull_number;
    });
}
