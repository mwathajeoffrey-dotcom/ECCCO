import nextConfig from "eslint-config-next";
import tseslint from "typescript-eslint";

const eslintConfig = [
  ...nextConfig,
  ...tseslint.configs.recommended,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      "dist/**",
      ".vercel/**",
      "coverage/**",
      "backups/**",
      "scripts/archived/**",
      "*.log",
      "*.config.js",
    ],
  },
  {
    rules: {
      // TypeScript rules - set to warn for gradual improvement
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      // React rules
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "off",
      // General rules
      "prefer-const": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default eslintConfig;
