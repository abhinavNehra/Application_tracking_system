// eslint.config.js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["src/**/*.ts"], // Match all .ts files in src
  ignores: ["**/build/**", "**/dist/**"],
  languageOptions: {
    parser: tseslint.parser, // Explicitly set TypeScript parser
    parserOptions: {
      ecmaVersion: "latest", // Use latest ECMAScript version
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
  ],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
});