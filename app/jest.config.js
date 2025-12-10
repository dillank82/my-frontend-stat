/* eslint-disable no-useless-escape */
export default {
  transform: {
    '^.+\.(ts|tsx)$': ["@swc/jest", {
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
        },
        target: "es2022",
      }
    }],
  },
  extensionsToTreatAsEsm: ['.ts, .tsx, js'],
  moduleNameMapper: {
    "/^(.{1,2}/.*).js$/": "$1",
    '\.(css|less|scss)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};