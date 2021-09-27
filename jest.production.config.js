module.exports = {
  resetMocks: true,
  moduleNameMapper: {
    "^@sdgindex/store(.*)$": "<rootDir>$1",
    "^mock:@sdgindex/store(.*)$": "<rootDir>/cjs$1",
    "^private:@sdgindex/store(.*)$": "<rootDir>/cjs$1",
    "^testHelpers(.*)$": "<rootDir>/tests/helpers$1",
  },
};
