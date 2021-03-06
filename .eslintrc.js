module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: ["eslint:recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	rules: {
		semi: ['error', 'always'],
		quotes: ["error", "single"],
		"no-unused-vars": "warn",
		"no-console": "off",
		"func-names": "off",
		"no-empty-function": "error"
	}
}