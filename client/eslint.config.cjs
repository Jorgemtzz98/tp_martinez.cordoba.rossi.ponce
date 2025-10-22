const js = require("@eslint/js");
const pluginReact = require("eslint-plugin-react");

module.exports = [
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        alert: "readonly",
        console: "readonly",
        document: "readonly",
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      "env": {
      "browser": true,
      "es2021": true
    },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];