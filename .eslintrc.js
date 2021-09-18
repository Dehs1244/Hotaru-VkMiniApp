module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
		"no-extra-semi":"error",
		"react/prop-types": "off",
		"no-unused-vars": "warn",
		"react/no-unescaped-entities": "off",
		"no-unreachable": "warn"
    }
};
