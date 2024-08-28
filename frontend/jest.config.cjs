// eslint-disable-next-line no-undef
module.exports = {
  preset: "react-app",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ['./jest.setup.js'], // Setup after env should be correct
  transformIgnorePatterns: [
    "/node_modules/(?!axios)"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/jest.mock.js",
  },
  moduleDirectories: ["node_modules", "src"],
};

