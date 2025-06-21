import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";

const compat = new FlatCompat();

export default [
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends("plugin:prettier/recommended"),
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        es6: true,
        node: true
      }
    },
    rules: {
      "no-var": "error",
      semi: "error",
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-multi-spaces": "error",
      "space-in-parens": "error",
      "no-multiple-empty-lines": "error",
      "sort-imports": [
        "error",
        {
          ignoreCase: true,
          allowSeparatedGroups: true,
          memberSyntaxSortOrder: ["all", "multiple", "single", "none"]
        }
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return"
        }
      ],
      "no-duplicate-imports": "error",
      "no-irregular-whitespace": "error",
      "prefer-spread": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-bitwise": "off",
      "prefer-const": "error",
      "prefer-object-spread": "error",
      "one-var": ["error", "never"],
      "comma-dangle": "off",
      "no-return-assign": ["error", "always"],
      // "max-len": [
      //   "error",
      //   {
      //     ignoreUrls: true,
      //     ignoreComments: false,
      //     ignoreRegExpLiterals: true,
      //     ignoreStrings: true,
      //     ignoreTemplateLiterals: true
      //   }
      // ],
      "prefer-arrow-callback": [
        "error",
        {
          allowNamedFunctions: false,
          allowUnboundThis: true
        }
      ],
      "no-else-return": "error",
      "object-shorthand": ["error", "always"],
      "no-console": 0,
      "max-classes-per-file": ["error", 1],
      // "@typescript-eslint/no-explicit-any": "error",
      // "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "@typescript-eslint/member-ordering": "error",
      // "@typescript-eslint/naming-convention": "error",
      "@typescript-eslint/no-unused-vars": ["warn"]
    }
  }
];
