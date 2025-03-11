import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: [
      "./app/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./app/**/**/*.{ts,tsx}",
    ],
  },
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"], // Add this if you are using React 17+
  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-undef": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
