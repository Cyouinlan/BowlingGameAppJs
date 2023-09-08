/* eslint-env node */
module.exports = {
  ignorePatterns: ["dist"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint",],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  env: {
    node: true
  },
  rules: {
    indent: ["warn", 2],
    
    "space-before-function-paren": ["warn", "never"],
    'padding-line-between-statements': [
      'warn',
      // Insère une ligne vide entre les déclarations de variables (const, let, var)
      { blankLine: 'never', prev: 'const', next: '*' },
      { blankLine: 'never', prev: 'let', next: '*' },
      { blankLine: 'never', prev: 'var', next: '*' },
      // Insère une ligne vide avant et après les blocs de code (if, for, while, etc.)
      { blankLine: 'always', prev: '*', next: ['if', 'for', 'while', 'switch'] },
      { blankLine: 'always', prev: ['if', 'for', 'while', 'switch'], next: '*' },
      // Insère une ligne vide avant chaque return
      { blankLine: 'always', prev: '*', next: 'return' },
      
    ],
  },
};
