// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Optional: for setup like extending Jest with matchers
//     collectCoverageFrom: [
//       'src/**/*.{ts,tsx}',
//       '!src/**/*.d.ts',
//       '!src/index.tsx', // Example: exclude entry point
//       '!src/reportWebVitals.ts', // Example: exclude utility files
//       '!src/**/*.stories.{ts,tsx}', // Example: exclude storybook files
//     ],
//     coverageReporters: ['html', 'text', 'lcov'],
//     coverageThreshold: {
//       global: {
//         lines: 80,
//         statements: 80,
//         functions: 80,
//         branches: 80,
//       },
//     },
//   };