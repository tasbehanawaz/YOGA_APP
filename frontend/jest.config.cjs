module.exports = {
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx"],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ['dotenv/config'], // Load .env variables
  setupFilesAfterEnv: ['./jest.setup.js'], // Jest setup file
  transformIgnorePatterns: [
    "/node_modules/(?!axios)"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/jest.mock.js",
  },
  moduleDirectories: ["node_modules", "src"],
};




// module.exports = {
//   transform: {
//     "^.+\\.(js|jsx)$": "babel-jest",
//   },
//   moduleFileExtensions: ["js", "jsx"],
//   testEnvironment: "jest-environment-jsdom",
//   setupFiles: ['./jest.setup.js'],
//   transformIgnorePatterns: [
//     "/node_modules/(?!axios)"
//   ],
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "<rootDir>/jest.mock.js",  // Add this line
//   },
//   moduleDirectories: ["node_modules", "src"],
//   setupFilesAfterEnv: ['./jest.setup.js'],
// };