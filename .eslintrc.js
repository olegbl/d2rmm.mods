module.exports = {
  rules: {
    'guard-for-in': 'off', // not working with non-pojos
    'no-console': 'error', // console is not available in scope anyway
    'no-restricted-syntax': 'off', // we need to iterate using loops since Object is not available in scope
    'no-undef': 'off', // we have global definitions coming from mod manager
    'prefer-destructuring': 'off', // no need to force it here
  },
};
