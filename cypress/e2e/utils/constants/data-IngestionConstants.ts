export const topRightFindAndContain = [
  { dataCy: "top-right-title", text: "DATA IS CRITICAL" },
  { dataCy: "top-right-header", text: "Do you trust your data sources?" },
  { dataCy: "top-right-list-item-one", text: "How do you know when" },
  {
    dataCy: "top-right-list-item-two",
    text: "How fast can you recover from bad data?",
  },
  {
    dataCy: "top-right-list-item-three",
    text: "How quickly can you identify it?",
  },
];

export const topBottomFindAndContain = [
  { dataCy: "top-bottom-title", text: "REMOVING THE RISK" },
  { dataCy: "top-bottom-header", text: "Dolt versions data like code" },
  { dataCy: "top-bottom-list-item-one", text: "Cell level version control" },
  {
    dataCy: "top-bottom-list-item-two",
    text: "Human and machine readable data diffs",
  },
  {
    dataCy: "top-bottom-list-item-three",
    text: "Instantaneous rollback and rollforward of data versions",
  },
  {
    dataCy: "top-bottom-list-item-four",
    text: "A pull request workflow for ad-hoc updates, complete with CI/CD",
  },
];

export const bulletQueryFindAndContain = [
  { dataCy: "bullet-query-header", text: "Query" },
  { dataCy: "bullet-query-item-one", text: "Full SQL interface" },
  { dataCy: "bullet-query-item-two", text: "Query any version from SQL" },
  { dataCy: "bullet-query-item-three", text: "Identify cell level changes" },
];

export const bulletScriptFindAndContain = [
  { dataCy: "bullet-script-header", text: "Script" },
  {
    dataCy: "bullet-script-item-one",
    text: "Test incoming data with scriptable business logic",
  },
  {
    dataCy: "bullet-script-item-two",
    text: "Run validations against only deltas for efficient testing",
  },
];

export const bulletVersionFindAndContain = [
  { dataCy: "bullet-version-header", text: "Version" },
  {
    dataCy: "bullet-version-item-one",
    text: "Track a cell value through time",
  },
  {
    dataCy: "bullet-version-item-two",
    text: "Script logic for time series analyses",
  },
  {
    dataCy: "bullet-version-item-three",
    text: "Rollback and rollforward instantly",
  },
];

export const doltInActionTopFindAndContain = [
  { dataCy: "dolt-in-action-title", text: "Dolt In Action" },
  {
    dataCy: "dolt-in-action-description",
    text: "In this demo we use Dolt and GitHub Actions to version a public dataset and run SQL against the result",
  },
];

export const doltInActionListFindAndContain = [
  {
    dataCy: "dolt-in-action-list-item-one",
    text: "Simple, fully customizable GitHub Action driven ETL process",
  },
  {
    dataCy: "dolt-in-action-list-item-two",
    text: "Run SQL over every version of the data",
  },
  {
    dataCy: "dolt-in-action-list-item-three",
    text: "Data diffs in SQL tables",
  },
  {
    dataCy: "dolt-in-action-list-item-four",
    text: "A commit for each version of the data",
  },
];

export const exampleItemsFindAndContain = [
  {
    dataCyTitle: "workflow-title",
    textTitle: "The workflow file",
    dataCyDescription: "workflow-description",
    textDescription:
      "A simple GitHub Action definition that pushes to a Dolt database hosted on DoltHub",
  },
  {
    dataCyTitle: "script-title",
    textTitle: "The script",
    dataCyDescription: "script-description",
    textDescription: "Doltpy, our Python API, turns data into Dolt tables",
  },
  {
    dataCyTitle: "output-title",
    textTitle: "The output",
    dataCyDescription: "output-description",
    textDescription: "See it in action, running daily",
  },
];
