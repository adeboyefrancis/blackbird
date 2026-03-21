import * as testingLibrary from "eslint-plugin-testing-library";
// ESLint flat config for React project
import js from "@eslint/js";
import react from "eslint-plugin-react";
import parserBabel from "@babel/eslint-parser";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: parserBabel,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"]
        },
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
  },
  // Testing-library rules temporarily removed due to plugin/flat config incompatibility
];
