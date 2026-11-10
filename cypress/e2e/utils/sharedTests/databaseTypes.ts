// Shared config for running the same database page tests against Dolt and
// Doltgres databases. The `automated_testing_doltgres` org mirrors the
// `automated_testing` fixture databases as Doltgres databases.

export type DatabaseTypeConfig = {
  // Prefix for test page names, i.e. "Database page with ..."
  label: string;
  currentOwner: string;
  isDoltgres: boolean;
};

export const doltConfig: DatabaseTypeConfig = {
  label: "Database",
  currentOwner: "automated_testing",
  isDoltgres: false,
};

export const doltgresConfig: DatabaseTypeConfig = {
  label: "Doltgres database",
  currentOwner: "automated_testing_doltgres",
  isDoltgres: true,
};

export const databaseTypeConfigs = [doltConfig, doltgresConfig];

const doltgresSchema = "public";

// Doltgres table names are schema-qualified in the left nav.
export const getTableName = (tableName: string, isDoltgres: boolean): string =>
  isDoltgres ? `${doltgresSchema}.${tableName}` : tableName;

// Query shown in the SQL editor after clicking a view in the left nav.
export const getViewQuery = (viewName: string, isDoltgres: boolean): string =>
  isDoltgres
    ? `SELECT * FROM ${doltgresSchema}.${viewName}`
    : `select * from ${viewName}`;

// Postgres identifiers with uppercase or special characters are quoted.
const quoteIdent = (name: string): string =>
  /^[a-z_][a-z0-9_]*$/.test(name) ? name : `"${name}"`;

// Query shown in the SQL editor after clicking a table in the Schemas tab.
export const getSchemaQuery = (
  tableName: string,
  isDoltgres: boolean,
): string =>
  isDoltgres
    ? `SHOW CREATE TABLE ${doltgresSchema}.${quoteIdent(tableName)}`
    : `show create table ${tableName}`;
