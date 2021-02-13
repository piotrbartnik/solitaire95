module.exports = {
  transform: {
    "^.+\\.(tsx|js|ts)$": "babel-jest",
  },
  testRegex: ".test.(tsx?|js)$",
  moduleNameMapper: {
    "\\.(png|woff|woff2|mp3)$": "<rootDir>/__mocks__/fileMock.js",
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
  },
  setupFilesAfterEnv: ["./setupTests.ts"],
};
