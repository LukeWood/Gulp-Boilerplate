module.exports = {
  'env': {
      'browser': true,
      'node': true,
      'es6': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
      'sourceType': 'module'
  },
  'rules': {
      'indent': [2, 2],
      'linebreak-style': [2, 'unix'],
      'quotes': [2, 'single'],
      'semi': [2, 'always'],
      'brace-style': [2, '1tbs'],
      'array-bracket-spacing': [2, 'never'],
      'camelcase': [2, {'properties': 'always'}],
      'keyword-spacing': [2],
      'eol-last': [2],
      'no-console': 0,
      'no-trailing-spaces': [2],
  },
  'globals': {
      'Persons': true,
      'Modules': true,
      'lodash': true,
      'i18n': true,
      'moment': true,
      'Messenger': true,
      'it': true
  }
}
