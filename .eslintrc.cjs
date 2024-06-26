module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "airbnb/hooks",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
