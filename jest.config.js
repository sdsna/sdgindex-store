module.exports = {
  resetMocks: true,
  moduleNameMapper: {
    "^@sdgindex/store(.*)$": "<rootDir>/src$1",
    "^mock:@sdgindex/store(.*)$": "<rootDir>/src$1",
    "^private:@sdgindex/store(.*)$": "<rootDir>/src$1",
    "^testHelpers(.*)$": "<rootDir>/tests/helpers$1",
  },
};
