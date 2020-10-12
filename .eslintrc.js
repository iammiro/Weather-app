module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        "no-underscore-dangle": ["allow"],
        "class-methods-use-this": ["allow"],
        "no-unused-vars": ["allow"],
        "no-undef": ["allow"],
        "no-restricted-globals": ["allow"],
        "no-plusplus": ["allow"],
    },
};
