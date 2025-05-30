import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import cypress from "eslint-plugin-cypress";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended,
  {
    files: ["cypress/**/*.{js,ts}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      cypress,
      import: importPlugin,
    },
    rules: {
      // TypeScript ESLint rules
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
        },
        {
          selector: ["typeLike", "enumMember"],
          format: ["PascalCase"],
        },
        {
          selector: ["objectLiteralProperty"],
          format: null,
        },
      ],
      "@typescript-eslint/no-base-to-string": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          classes: false,
          functions: false,
        },
      ],
      "@typescript-eslint/prefer-nullish-coalescing": ["warn"],
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/promise-function-async": "error",

      // Import rules
      "import/prefer-default-export": "off",

      // General rules
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
      "no-sequences": "error",
      "no-underscore-dangle": "off",
      "no-use-before-define": ["error", { classes: false, functions: false }],
      "no-unused-vars": "off", // Use @typescript-eslint/no-unused-vars instead
      "func-names": "warn",

      // Cypress rules
      "cypress/no-unnecessary-waiting": "warn",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  {
    files: ["cypress/**/*.{js,ts}"],
    ...cypress.configs.recommended,
    rules: {
      ...cypress.configs.recommended.rules,
      "cypress/no-unnecessary-waiting": "warn",
    },
  },
  {
    files: ["*.config.ts", "*.config.js"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "*.min.js",
      "cypress/videos/**",
      "cypress/screenshots/**",
      "cypress/downloads/**",
      "eslint.config.js",
    ],
  },
];
