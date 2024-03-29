module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "simple-import-sort"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "indent": ["error", 2],
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "max-len": ["error", {"code": 140}],
    "no-empty": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-this-alias": 0,
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
}