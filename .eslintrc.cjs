module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		"cypress/globals": true,
	},
	extends: ["eslint:recommended", "plugin:vue/vue3-essential"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["vue", "cypress"],
	rules: {
		indent: ["error", "tab", { SwitchCase: 1 }],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
