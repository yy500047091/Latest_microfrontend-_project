// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',
//     // setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
//     collectCoverageFrom: [
//       'src/**/*.{ts,tsx}',
//       '!src/**/*.d.ts',
//       '!src/index.tsx',
//       '!src/reportWebVitals.ts',
//       '!src/**/*.stories.{ts,tsx}',
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
//     moduleNameMapper: {
//       '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
//     },
//     globals: {
//       'ts-jest': {
//         tsconfig: '<rootDir>/tsconfig.app.json', // Specify tsconfig.app.json here
//       },
//     },
//   };
  



 
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    setupFiles: ['<rootDir>/src/setupTests.ts'],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/index.tsx',
      '!src/reportWebVitals.ts',
      '!src/**/*.stories.{ts,tsx}',
    ],
    coverageReporters: ['html', 'text', 'lcov'],
    coverageThreshold: {
      global: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 80,
      },
    },
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    },
    // Explicitly tell Jest to handle ES Modules
    // module: 'esmodules',
    globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/tsconfig.app.json', // Specify tsconfig.app.json here
        },
      }, // Or 'esm'
    transform: {
      '^.+\\.tsx?$': ['ts-jest', {
        tsconfig: '<rootDir>/tsconfig.app.json',
        // Add this if you were having issues with isolatedModules
        // isolatedModules: false,
      }],
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
  };